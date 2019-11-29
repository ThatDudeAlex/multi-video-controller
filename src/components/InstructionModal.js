import React from 'react';
import { Modal, Button } from 'react-bootstrap'

const InstructionModal = (props) => {
    return (
        <Modal show={props.showModal} onHide={props.toggleModal}>
            <Modal.Header>
                <Modal.Title>Instructions</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p>Spacebar Or K : plays or pauses videos</p>
                <p>L : Fast-forward</p>
                <p>J : Rewinds</p>
                <p>R : Restart videos</p>
                <p>M : Switches to controlling a single video or all videos</p>
                <p>N : Controls next video</p>
                <p>P : Controls previous video</p>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="danger" onClick={props.toggleModal}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default InstructionModal;
