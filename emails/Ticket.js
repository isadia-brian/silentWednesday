import * as React from "react";
import {
  Font,
  Html,
  Body,
  Img,
  Section,
  Container,
  Head,
  Text,
  Preview,
  Column,
  Row,
  Link,
  Hr,
  Tailwind,
} from "@react-email/components";
import { IoPhonePortraitOutline } from "react-icons/io5";

export default function HelloEmail() {
  return (
    <Html>
      <Head>
        <Font
          fontFamily="Roboto"
          fallbackFontFamily="Verdana"
          webFont={{
            url: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
            format: "woff2",
          }}
        />
      </Head>
      <Preview>Silent Palms Receipt</Preview>
      <Tailwind>
        <Body className="bg-white border border-slate-300 border-solid my-10  w-[700px] mx-auto">
          <Container className="py-4 px-2">
            <Section>
              <Column className="w-full">
                <Img
                  src="https://1000logos.net/wp-content/uploads/2023/04/Starbucks-logo-500x281.png"
                  alt="Silent Palms logo"
                  className="rounded-full h-14 w-24 "
                />
              </Column>
              <Column>
                <Text className="text-2xl text-green-300">Receipt</Text>
              </Column>
            </Section>
            <Section className="px-[90px]">
              <Column>
                <Row>
                  <Text>Hello Brian,</Text>
                </Row>
                <Row>
                  <Text>
                    Thank you for staying with us during your stay at Diani.
                    Your reservation has been confirmed.
                  </Text>
                </Row>
              </Column>
            </Section>
            <Section className="w-[520px] text-xs bg-green-100">
              <Row className="px-6 pb-4 w-full">
                <Column>
                  <Row>
                    <Column>
                      <Text className="-mb-1 text-gray-400">EMAIL</Text>
                      <Link>brian@gmail.com</Link>
                    </Column>
                  </Row>
                  <Row className="">
                    <Column>
                      <Text className="-mb-5 text-gray-400">INVOICE DATE</Text>
                      <Text>18 July 2023</Text>
                    </Column>
                  </Row>
                  <Row className="-mt-5">
                    <Column>
                      <Text className="-mb-1 text-gray-400">BOOKING ID</Text>
                      <Link>ML56777777</Link>
                    </Column>
                  </Row>
                </Column>

                <Column className="max-w-[50px]">
                  <Text className="text-sm -mb-4 text-gray-400">BILLED TO</Text>
                  <Text className="text-sm -mb-4">Brian Lusigi</Text>
                  <Text className="text-sm ">Kenya</Text>
                </Column>
              </Row>
            </Section>
            <Section className="px-[90px] my-6">
              <Column className="">
                <Img
                  className="h-20 w-24 "
                  src="https://assets-global.website-files.com/5c6d6c45eaa55f57c6367749/624b471bdf247131f10ea14f_61d31b8dbff9b500cbd7ed32_types_of_rooms_in_a_5-star_hotel_2_optimized_optimized.jpeg"
                />
              </Column>
              <Column>
                <Text className="font-extrabold text-green-700">
                  2 Bedroom Executive Accomodation B2{" "}
                </Text>
                <Text className="-mt-5">Guests - 5 </Text>
                <Text className="-mt-5">Stay Till Aug 20, 2023</Text>
              </Column>
              <Column align="right">
                <Text className="font-bold text-xs text-green-700">
                  Kshs 7,500
                </Text>
              </Column>
            </Section>
            <Section className="px-[90px] w-full">
              <Column className="w-full ">
                <Row>
                  <Hr />
                </Row>
                <Row className="w-[150px] " align="right">
                  <Column align="right">
                    <Text className="text-[10px] pr-3">TOTAL</Text>
                  </Column>
                  <Column style={borderedText} align="right"></Column>
                  <Column align="right">
                    <Text className="font-bold text-green-700">Kshs 7,500</Text>
                  </Column>
                </Row>
                <Row>{""}</Row>
                <Row>
                  <Hr />
                </Row>
              </Column>
            </Section>
            <Section className="px-[90px] w-full">
              <Column>
                <Text>Best,</Text>
                <Text className="-mt-5">Silent Palms Villa Team</Text>
              </Column>
            </Section>

            <Section className="px-[90px] w-full bg-slate-50">
              <Row>
                <Text className="font-bold">Get Help</Text>
              </Row>
              <Row className="">
                <Column className="w-[30px]">
                  <IoPhonePortraitOutline className="w-8 h-8" />
                </Column>
                <Column>
                  <Text className="ml-2 font-bold">+254798024710</Text>
                </Column>
                <Column align="right">
                  <Text className="font-semibold">8 am - 9 pm</Text>
                </Column>
              </Row>
            </Section>
            <Section className="my-5 w-full  grid justify-items-center ">
              <Link
                href="https://silentpalmsvilla.com"
                className="text-3xl font-extrabold text-green-700"
              >
                silentpalmsvilla.com
              </Link>
            </Section>
            <Hr />
            <Section className="px-[90px] w-full">
              <Text className="text-center text-slate-400">
                Please Contact us if you have any questions.
              </Text>
              <Text className="text-center text-slate-400">
                &copy; 2023, silentpalms villa
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

const borderedText = {
  borderRight: "1px solid",
  borderColor: "rgb(238,238,238)",
  height: "28px",
};
