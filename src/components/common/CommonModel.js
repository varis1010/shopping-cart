import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function CommonModel(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.headerText}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>  {props.bodyText}</h4>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
        <Button onClick={props.onSuccess}>Okay</Button>
      </Modal.Footer>
    </Modal>
  );
}
