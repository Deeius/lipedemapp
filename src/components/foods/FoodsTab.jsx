import AddFoodForm from "./AddFoodForm";
import FoodsList from "./FoodsList";

export default function FoodsTab({
  foods,
  newFood,
  setNewFood,
  addFood,
  removeFood,
  lang,
  C,
  S,
  t,
}) {
  return (
    <>
      <AddFoodForm
        newFood={newFood}
        setNewFood={setNewFood}
        addFood={addFood}
        lang={lang}
        C={C}
        S={S}
        t={t}
      />
      <FoodsList
        foods={foods}
        removeFood={removeFood}
        C={C}
        S={S}
        t={t}
      />
    </>
  );
}
