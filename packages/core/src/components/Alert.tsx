import { notification } from 'antd';

const alert = data => {
  console.log(data);

  if ('code' in data && 'message' in data) {
    const message = data.code;
    const description = data.message;
    notification.open({
      message,
      description,
      onClick: () => {
        console.log('Notification Clicked!');
        console.log('great');
      },
    });
  }
};

export { alert };
