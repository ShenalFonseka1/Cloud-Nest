import Search from "@/components/Search";
import FileUploader from "@/components/FileUploader";
import Image from "next/image";
import { signOutUser } from "@/lib/actions/user.actions";

const Header = ({
  userId,
  accountId,
}: {
  userId: string;
  accountId: string;
}) => {
  return (
    <header className="header">
      <Search />
      <div className="header-wrapper">
        <FileUploader ownerId={userId} accountId={accountId} />
        <form
          action={async () => {
            "use server";

            await signOutUser();
          }}
        >
          <button type="submit" className="sign-out-button">
            <Image
              src="assets/icons/logout.svg"
              alt="logo"
              width={25}
              height={25}
              className="w-8"
            />
          </button>
        </form>
      </div>
    </header>
  );
};

export default Header;
