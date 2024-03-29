import React, { useState } from 'react';
import { Drawer, DrawerHeader, DrawerNavigation, Button } from '@lace/common';
import { SettingsCard } from './';
import styles from './SettingsLayout.module.scss';
import { Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { QRPublicKeyDrawer } from '@src/views/browser-view/components/QRPublicKeyDrawer';
import { useKeyboardShortcut } from '@hooks';

const { Text } = Typography;

interface GeneralSettingsDrawerProps {
  visible: boolean;
  onClose: () => void;
  popupView?: boolean;
}

export const GeneralSettingsDrawer = ({
  visible,
  onClose,
  popupView
}: GeneralSettingsDrawerProps): React.ReactElement => {
  const [isPublicKeyQRVisible, setIsPublicKeyQRVisible] = useState(false);
  const { t } = useTranslation();

  const handleGoBackDrawer = () => {
    if (isPublicKeyQRVisible) {
      setIsPublicKeyQRVisible(false);
    } else {
      onClose();
    }
  };

  const handleClose = () => {
    onClose();
    setIsPublicKeyQRVisible(false);
  };

  useKeyboardShortcut(['Escape'], () => visible && handleGoBackDrawer());

  return (
    <>
      <Drawer
        visible={visible}
        onClose={handleClose}
        title={
          <DrawerHeader
            popupView={popupView}
            title={isPublicKeyQRVisible ? t('qrInfo.publicKey') : t('browserView.settings.wallet.general.title')}
          />
        }
        navigation={
          <DrawerNavigation
            title={t('browserView.settings.heading')}
            onCloseIconClick={!popupView ? handleClose : undefined}
            onArrowIconClick={popupView || isPublicKeyQRVisible ? handleGoBackDrawer : undefined}
          />
        }
        popupView={popupView}
        destroyOnClose
      >
        <div className={popupView ? styles.popupContainer : undefined}>
          {isPublicKeyQRVisible ? (
            <QRPublicKeyDrawer isPopup={popupView} />
          ) : (
            <SettingsCard>
              <Text className={styles.drawerDescription}>
                {t('browserView.settings.wallet.general.showPubKeyDescription')}
              </Text>
              <Button
                size="large"
                color="primary"
                block
                data-testid="show-public-key-button"
                className={styles.drawerButton}
                onClick={() => setIsPublicKeyQRVisible(true)}
              >
                {t('browserView.settings.wallet.general.showPubKeyAction')}
              </Button>
            </SettingsCard>
          )}
        </div>
      </Drawer>
    </>
  );
};
