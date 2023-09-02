import React from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';


import {WrapperStyle} from './Notification-style'



type Props = {
  show: boolean;
  setShow: any;
  notification: any;
};


const Notification: React.FC<Props> = ({ show, setShow, notification }) => {
    console.log(notification);
  return (
    <WrapperStyle>
      <Toast onClose={() => setShow(false)} show={show}>
        <Toast.Header>
          <img
            src={notification[0]?.userPicturePath}
            className="rounded me-2"
            alt=""
          />
          <strong className="me-auto">{notification[0]?.firstName}</strong>
          <small>11 mins ago</small>
        </Toast.Header>
        <Toast.Body className="text-bg">
          Woohoo, you're reading this text in a Toast!
          <Button variant="secondary" size="sm">
            Accept
          </Button>
          <Button variant="secondary" size="sm">
            Reject
          </Button>
        </Toast.Body>
      </Toast>
    </WrapperStyle>
  );
};

export default Notification