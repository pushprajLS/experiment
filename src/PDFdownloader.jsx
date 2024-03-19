import React, { useState } from "react";
import { Button } from "reactstrap";
import ClientAgreementDownloadModal from "./components/ClientAgreementDownloadModal";

const PDFdownloader = ({ clientDetails }) => {
  const [agreementModal, setagreementModal] = useState({
    isOpen: false,
    data: null,
  });

  const _toggleAgreementModal = (isOpen = false, data = null) => {
    setagreementModal({ isOpen, data });
  };

  const _onSuccessDonloadAgreement = () => {
    // show toast Agreement Dowloaded successfuly
  };

  return (
    <div>
      PDFdownloader
      <div>
        <Button onClick={() => _toggleAgreementModal(true, clientDetails)}>
          View Agreement
        </Button>

        <ClientAgreementDownloadModal
          isOpen={agreementModal.isOpen}
          data={agreementModal.data}
          onSuccess={_onSuccessDonloadAgreement}
          onDismiss={_toggleAgreementModal}
        />
      </div>
    </div>
  );
};

export default PDFdownloader;
