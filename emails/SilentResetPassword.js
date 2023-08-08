import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Img,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import "../styles/globals.css";

const SilentResetPassword = () => {
  return (
    <Html>
      <Head />

      <Preview>Silent Palms Villa Reset Password</Preview>
      <div className=" flex items-center justify-center">
        <Tailwind>
          <Body className="bg-white border border-solid border-green-200 ">
            <Container className="bg-white  rounded p-[10px] w-full">
              <Section className="mt-[32px]">
                <Img
                  src="https://silent-palms.vercel.app/_next/image?url=%2Fimages%2Flogo.jpeg&w=1920&q=75"
                  width="80"
                  height="80"
                  alt="SilentPalms"
                  className=" rounded-full border border-green-700 border-solid "
                />
              </Section>
              <Section className="">
                <Text className={` text-black`}>Hi</Text>
                <Text className={` text-black`}>
                  Someone recently requested a password change for your Silent
                  Palms account. If this was you, you can set a new password
                  here:
                </Text>
                <Button
                  className={` text-center bg-green-500 py-3 grid justify-items-center  w-[200px] text-white`}
                  href="#"
                >
                  Reset password
                </Button>
                <Text className={` text-black`}>
                  If you don&apos;t want to change your password or didn&apos;t
                  request this, just ignore and delete this message.
                </Text>
                <Text className="text-black">
                  To keep your account secure, please don&apos;t forward this
                  email to anyone. Contact support in case of any challenges.
                </Text>
                <Text style={text}>Good Day</Text>
              </Section>
            </Container>
          </Body>
        </Tailwind>
      </div>
    </Html>
  );
};

export default SilentResetPassword;

const text = {
  color: "green",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
};
