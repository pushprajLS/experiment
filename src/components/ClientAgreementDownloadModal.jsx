import React, { useEffect, useState } from "react";
import { Margin, usePDF } from "react-to-pdf";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";
import PDFdocument from "../PDFdocument";

const ClientAgreementDownloadModal = ({ isOpen, data, onDismiss }) => {
  const [clientDetails, setClientDetails] = useState({});

  const { toPDF, targetRef } = usePDF({
    filename: "client-agreement.pdf",
    page: { margin: Margin.MEDIUM },
  });

  const _close = () => {
    onDismiss();
  };

  const _presetClientDetails = () => {
    setClientDetails({});
  };

  useEffect(() => {
    if (isOpen) {
      _presetClientDetails(clientDetails);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} toggle={() => _close()} size="lg" scrollable={true}>
      <ModalBody>
        <div ref={targetRef}>
          <PDFdocument clientDetails={clientDetails} />
        </div>
      </ModalBody>

      <ModalFooter>
        <Button color="danger" outline={true} onClick={() => _close()}>
          Close
        </Button>

        <Button color="primary" onClick={toPDF}>
          Download
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ClientAgreementDownloadModal;
