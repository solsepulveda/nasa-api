import { notification } from "antd";
import { HeartOutlined, WarningOutlined } from "@ant-design/icons";

export const openNotificationSuccess = (message) => {
  notification.open({
    message: message,
    icon: <HeartOutlined style={{ color: "#108ee9" }} />
  });
};

export const openNotificationError = (message) => {
  notification.open({
    message: message,
    icon:<WarningOutlined style={{ color: "#108ee9" }} />,
  });
};

export const openNotificationRegistration = () => {
  notification.open({
    icon: <HeartOutlined style={{ color: "#108ee9" }} />,
    message:<div>Para guardar en favoritos, debes <a href="/login">registrarte</a></div>
  });
};