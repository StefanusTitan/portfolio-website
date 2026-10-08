import Head from "next/head";
import Hero from "../components/Hero";
import Work from "../components/Work";
import ProjectList from "../components/ProjectList";
import Background from "../components/Background";
import Contact from "../components/Contact";
import { profile } from "../data/profile";

export default function Home() {
  return (
    <>
      <Head>
        <title>{`${profile.name}, software engineer`}</title>
        <meta name="description" content={profile.description} />
        <meta property="og:title" content={`${profile.name}, software engineer`} />
        <meta property="og:description" content={profile.description} />
        <meta property="og:type" content="profile" />
      </Head>
      <Hero />
      <Work />
      <ProjectList />
      <Background />
      <Contact />
    </>
  );
}
