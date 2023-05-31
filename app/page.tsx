type Props = {};

const Home = (props: Props) => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Find & Share
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center">AI-Powered Prompts</span>
      </h1>
      <p className="desc text-center">
        PromptyDumpty is an open community for sharing and discovering AI
        prompts to be used in a variety of AI products like ChatGPT and
        Midjourney
      </p>
    </section>
  );
};

export default Home;
