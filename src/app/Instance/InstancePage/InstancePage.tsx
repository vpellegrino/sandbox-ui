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
  Nav,
  NavItem,
  NavList,
  PageSection,
  PageSectionVariants,
  Split,
  SplitItem,
  Text,
  TextContent,
} from "@patternfly/react-core";
import {
  NavLink,
  Redirect,
  Route,
  Switch,
  useHistory,
  useParams,
  useRouteMatch,
} from "react-router-dom";
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
  }, [bridgeError, getPageTitle, history, t]);

  const [showInstanceDeleteModal, setShowInstanceDeleteModal] = useState(false);

  const deleteInstance = (): void => {
    setShowInstanceDeleteModal(true);
  };

  const handleOnDeleteInstanceSuccess = useCallback((): void => {
    setShowInstanceDeleteModal(false);
    history.push(`/`);
  }, [history]);

  const { path, url } = useRouteMatch();

  const navItems = [
    { url: "processors", label: t("common.processors") },
    { url: "error-handling", label: t("common.errorHandling") },
  ];

  return (
    <Drawer isExpanded={showInstanceDrawer}>
      <DrawerContent
        data-ouia-component-id="instance-drawer"
        panelContent={
          bridge && (
            <InstanceDetails
              onClosingDetails={(): void => setShowInstanceDrawer(false)}
              instance={bridge}
            />
          )
        }
      >
        {isBridgeLoading && (
          <PageHeaderSkeleton
            pageTitle={t("instance.loadingInstance")}
            hasActionDropdown={true}
            hasLabel={false}
          />
        )}
        {bridge && (
          <>
            <PageSection variant={PageSectionVariants.light} type="breadcrumb">
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
          </>
        )}
        <PageSection type="nav" style={{ paddingTop: 0 }}>
          {bridge && (
            <Nav variant="tertiary" aria-label="Instance navigation">
              <NavList>
                {navItems.map((route, index) => (
                  <NavItem
                    key={index}
                    isActive={location.pathname.endsWith(`${url}/${route.url}`)}
                    component={"span"}
                    ouiaId={route.url}
                  >
                    <NavLink to={`${url}/${route.url}`}>{route.label}</NavLink>
                  </NavItem>
                ))}
              </NavList>
            </Nav>
          )}
        </PageSection>
        <Switch>
          <Route exact path={`${path}`}>
            <Redirect to={`${url}/processors`} />
          </Route>
          <Route path={`${path}/processors`}>
            <PageSection>
              <ProcessorsTabContent
                instanceId={instanceId}
                pageTitle={getPageTitle(bridge)}
              />
            </PageSection>
          </Route>
          <Route path={`${path}/error-handling`}>
            <PageSection>
              <ErrorHandlingTabContent
                isBridgeLoading={isBridgeLoading}
                errorHandlingType={bridge?.error_handler?.type}
                errorHandlingParameters={
                  bridge?.error_handler?.parameters as {
                    [p: string]: unknown;
                  }
                }
              />
            </PageSection>
          </Route>
        </Switch>
        <DeleteInstance
          instanceId={bridge?.id}
          instanceName={bridge?.name}
          showDeleteModal={showInstanceDeleteModal}
          onCanceled={(): void => setShowInstanceDeleteModal(false)}
          onDeleted={handleOnDeleteInstanceSuccess}
        />
      </DrawerContent>
    </Drawer>
  );
};

export default InstancePage;
