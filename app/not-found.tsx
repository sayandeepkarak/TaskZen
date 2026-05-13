import { Flex, Result } from "antd";

export default function NotFound() {
  return (
    <Flex align="center" justify="center" className="h-screen">
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
      />
    </Flex>
  );
}
