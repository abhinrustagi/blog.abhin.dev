import { Container } from "./Container";
import Link from "next/link";

export const Header = () => {
  return (
    <header className="w-full border-b-zinc-700 border-b py-5">
      <Container>
        <p className="font-bold text-lg">
          <Link href="/" passHref>
            <a>Blog // Abhin Rustagi</a>
          </Link>
        </p>
      </Container>
    </header>
  );
};
