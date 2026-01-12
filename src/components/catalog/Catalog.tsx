import Menu from "../menu/Menu";
import Filters from "../filters/Filters";
import Products from "../products/Products";

const Catalog = () => {
  return (
    <section className="bg-[#FCF7EB] min-h-screen">
      <div className="relative">
        <Menu />
        <div className="pt-10 center-nav mx-auto relative">
          <Filters />
          <Products />
        </div>
      </div>
    </section>
  );
};

export default Catalog;
