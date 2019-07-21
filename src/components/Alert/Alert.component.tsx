import * as React from 'react';
import { Wrapper, Title, Message, AltMessage } from './Alert.module.scss';
import { IAlertProps } from '../../interfaces/components/alert';

const AlertComponent: React.FC<IAlertProps> = ({ title, message, altMessage }) => (
  <div className={Wrapper}>
    <div className={Title}>{title}</div>
    <p className={Message}>{message}</p>
    <ul className={AltMessage}>
      {altMessage.map(item => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  </div>
);
export default AlertComponent;
