import { notification } from "antd";
import { HeartOutlined } from "@ant-design/icons";

const openNotificationSuccess = (message) => {
  notification.open({
    message: message,
    icon: <HeartOutlined style={{ color: "#108ee9" }} />,
  });
};

export default openNotificationSuccess;