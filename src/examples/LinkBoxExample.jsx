import {
  SiInstagram,
  SiApple,
  SiFacebook,
  SiGoogle,
  SiX,
  SiAmazon,
  SiMicrosoft,
  SiNetflix,
  SiTiktok,
} from "react-icons/si";
import LinkBox from "../components/LinkBox";

const LinkBoxExample = () => {
  return (
    <div className="border border-neutral-900 divide-y divide-neutral-900">
      <div className="grid grid-cols-2 divide-x divide-neutral-900">
        <LinkBox Icon={SiApple} href="#" />
        <LinkBox Icon={SiGoogle} href="#" />
      </div>
      <div className="grid grid-cols-4 divide-x divide-neutral-900">
        <LinkBox Icon={SiFacebook} href="#" />
        <LinkBox Icon={SiInstagram} href="#" />
        <LinkBox Icon={SiTiktok} href="#" />
        <LinkBox Icon={SiX} href="#" />
      </div>
      <div className="grid grid-cols-3 divide-x divide-neutral-900">
        <LinkBox Icon={SiMicrosoft} href="#" />
        <LinkBox Icon={SiNetflix} href="#" />
        <LinkBox Icon={SiAmazon} href="#" />
      </div>
    </div>
  );
};

export default LinkBoxExample;
