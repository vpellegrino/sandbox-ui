import React, { useCallback, useEffect, useState } from "react";
import {
  Drawer,
  DrawerContent,
  Dropdown,
  DropdownGroup,
  DropdownItem,
  DropdownPosition,
  DropdownSeparator,
  DropdownToggle,
  PageSection,
  PageSectionVariants,
  Split,
  SplitItem,
  Tab,
  TabContent,
  Tabs,
  TabTitleText,
  Text,
  TextContent,
} from "@patternfly/react-core";
import { useHistory, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Breadcrumb } from "@app/components/Breadcrumb/Breadcrumb";
import { CaretDownIcon } from "@patternfly/react-icons";
import "./InstancePage.css";
import { InstanceDetails } from "@app/Instance/InstanceDetails/InstanceDetails";
import { useGetBridgeApi } from "../../../hooks/useBridgesApi/useGetBridgeApi";
import PageHeaderSkeleton from "@app/components/PageHeaderSkeleton/PageHeaderSkeleton";
import { BridgeResponse } from "@rhoas/smart-events-management-sdk";
import DeleteInstance from "@app/Instance/DeleteInstance/DeleteInstance";
import { canDeleteResource } from "@utils/resourceUtils";
import {
  getErrorCode,
  isServiceApiError,
} from "@openapi/generated/errorHelpers";
import { APIErrorCodes } from "@openapi/generated/errors";
import axios from "axios";
import { ErrorWithDetail } from "../../../types/Error";
import { ProcessorsTabContent } from "@app/Instance/InstancePage/ProcessorsTabContent";
import { ErrorHandlingTabContent } from "@app/Instance/InstancePage/ErrorHandlingTabContent";

export interface InstanceRouteParams {
  instanceId: string;
}

const InstancePage = (): JSX.Element => {
  const { instanceId } = useParams<InstanceRouteParams>();
  const { t } = useTranslation(["openbridgeTempDictionary"]);
  const history = useHistory();

  const processorsTabRef = React.createRef<HTMLElement>();
  const errorHandlingTabRef = React.createRef<HTMLElement>();

  const [activeTabKey, setActiveTabKey] = useState<number | string>(0);
  const [isDropdownActionOpen, setIsDropdownActionOpen] =
    useState<boolean>(false);
  const [showInstanceDrawer, setShowInstanceDrawer] = useState<boolean>(false);

  const {
    getBridge,
    bridge,
    isLoading: isBridgeLoading,
    error: bridgeError,
  } = useGetBridgeApi();

  useEffect(() => {
    getBridge(instanceId);
  }, [getBridge, instanceId]);

  const getPageTitle = useCallback(
    (bridge?: BridgeResponse) => {
      const name = bridge ? bridge.name : t("instance.smartEventInstance");
      return (
        <TextContent>
          <Text ouiaId="instance-name" component="h1">
            {name}
          </Text>
        </TextContent>
      );
    },
    [t]
  );

  useEffect(() => {
    if (bridgeError && axios.isAxiosError(bridgeError)) {
      if (
        isServiceApiError(bridgeError) &&
        getErrorCode(bridgeError) === APIErrorCodes.ERROR_4
      ) {
        /* When the instance is not found on the server, we are going to replace
         * the current URL with a fake URL that does not match any route.
         * In this way, the PageNotFound component will be shown.
         */
        history.replace("/instance-not-found", {
          title: t("instance.notFound"),
          message: t("instance.errors.cantFindInstance"),
        });
      } else {
        throw new ErrorWithDetail(
          getPageTitle(),
          t("instance.errors.instanceDetailsGenericError")
        );
      }
    }
  }, [bridge, bridgeError, getPageTitle, history, t]);

  const handleTabClick = (
    _: React.MouseEvent<HTMLElement, MouseEvent>,
    eventKey: number | string
  ): void => {
    setActiveTabKey(eventKey);
  };

  const [showInstanceDeleteModal, setShowInstanceDeleteModal] = useState(false);

  const deleteInstance = (): void => {
    setShowInstanceDeleteModal(true);
  };

  const handleOnDeleteInstanceSuccess = useCallback((): void => {
    setShowInstanceDeleteModal(false);
    history.push(`/`);
  }, [history]);

  return (
    <>
      {isBridgeLoading && (
        <>
          <PageHeaderSkeleton
            pageTitle={t("instance.loadingInstance")}
            hasActionDropdown={true}
            hasLabel={false}
            totalTabs={2}
          />
        </>
      )}
      {bridge && (
        <>
          <Drawer isExpanded={showInstanceDrawer}>
            <DrawerContent
              data-ouia-component-id="instance-drawer"
              panelContent={
                <InstanceDetails
                  onClosingDetails={(): void => setShowInstanceDrawer(false)}
                  instance={bridge}
                />
              }
            >
              <PageSection
                variant={PageSectionVariants.light}
                type="breadcrumb"
              >
                <Breadcrumb
                  path={[
                    { label: t("instance.smartEventInstances"), linkTo: "/" },
                    { label: bridge.name ?? "" },
                  ]}
                />
              </PageSection>
              <PageSection variant={PageSectionVariants.light}>
                <Split>
                  <SplitItem isFilled>
                    <TextContent>
                      <Text ouiaId="instance-name" component="h1">
                        {bridge.name}
                      </Text>
                    </TextContent>
                  </SplitItem>
                  <SplitItem>
                    <Dropdown
                      className="instance-page__actions"
                      ouiaId="actions"
                      onSelect={(): void => setIsDropdownActionOpen(false)}
                      position={DropdownPosition.right}
                      toggle={
                        <DropdownToggle
                          ouiaId="actions"
                          onToggle={(isOpen: boolean): void =>
                            setIsDropdownActionOpen(isOpen)
                          }
                          toggleIndicator={CaretDownIcon}
                        >
                          {t("common.actions")}
                        </DropdownToggle>
                      }
                      isOpen={isDropdownActionOpen}
                      dropdownItems={[
                        <DropdownGroup
                          key="details-group"
                          label={t("instance.viewInformation")}
                        >
                          <DropdownItem
                            key="details"
                            ouiaId="details"
                            onClick={(): void => {
                              setShowInstanceDrawer(true);
                            }}
                          >
                            {t("common.details")}
                          </DropdownItem>
                        </DropdownGroup>,
                        <DropdownSeparator key="separator" />,
                        <DropdownItem
                          key="delete"
                          ouiaId="delete"
                          onClick={deleteInstance}
                          isDisabled={!canDeleteResource(bridge.status)}
                        >
                          {t("instance.delete")}
                        </DropdownItem>,
                      ]}
                    />
                  </SplitItem>
                </Split>
              </PageSection>
              <PageSection variant={PageSectionVariants.light} type="tabs">
                <Tabs
                  className="instance-page__tabs"
                  ouiaId="instance-details"
                  usePageInsets
                  activeKey={activeTabKey}
                  onSelect={handleTabClick}
                >
                  <Tab
                    eventKey={0}
                    ouiaId="processors"
                    tabContentId="instance-page__tabs-processors"
                    tabContentRef={processorsTabRef}
                    title={
                      <TabTitleText>{t("common.processors")}</TabTitleText>
                    }
                  />
                  <Tab
                    eventKey={1}
                    ouiaId="error-handling"
                    tabContentId="instance-page__tabs-error-handling"
                    tabContentRef={errorHandlingTabRef}
                    title={
                      <TabTitleText>{t("common.errorHandling")}</TabTitleText>
                    }
                  />
                </Tabs>
              </PageSection>
              <PageSection>
                <TabContent
                  eventKey={0}
                  id="instance-page__tabs-processors"
                  ouiaId="processors"
                  ref={processorsTabRef}
                  aria-label="Processors tab"
                >
                  <ProcessorsTabContent
                    instanceId={instanceId}
                    pageTitle={getPageTitle(bridge)}
                  />
                </TabContent>
                <TabContent
                  eventKey={1}
                  id="instance-page__tabs-error-handling"
                  ouiaId="error-handling"
                  ref={errorHandlingTabRef}
                  aria-label="Error handling tab"
                  hidden
                >
                  <ErrorHandlingTabContent
                    errorHandlerType={bridge?.error_handler?.type}
                    errorHandlerParameters={
                      bridge?.error_handler?.parameters as {
                        [p: string]: unknown;
                      }
                    }
                  />
                </TabContent>
              </PageSection>
              <DeleteInstance
                instanceId={bridge?.id}
                instanceName={bridge?.name}
                showDeleteModal={showInstanceDeleteModal}
                onCanceled={(): void => setShowInstanceDeleteModal(false)}
                onDeleted={handleOnDeleteInstanceSuccess}
              />
            </DrawerContent>
          </Drawer>
        </>
      )}
    </>
  );
};

export default InstancePage;
