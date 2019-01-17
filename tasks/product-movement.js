/* ЗАДАНИЕ */

/*
  Существует товар, производитель товара, потребитель товара,
  и посредник между производителем и потребителем. Ежедневно производитель
  создает произвольное количество единиц товара в интервале 50-150шт.
  Ежедневно у потребителя возникает необходимость в 70-120шт товара.
  Посредник за один день может доставить максимум 100шт товара.
  
  Смоделировать движение товара за 10 дней и вывести в табличной форме результаты.
  Колонки таблицы:
    * количество товара у производителя,
    * количество необходимого потребителю товара,
    * количество доставленного товара за день,
    * количество произведенного товара за последние 3 дня,
    * количество доставленного товара за последние 3 дня,
    * КПД посредника.

  Любой объект в этом задании должен быть экземпляром класса.
  Чтение и модификация свойств объектов извне должны быть реализованы через методы.
*/

// ######################### //

function createTable() {
  return {};
}

// ######################### //


module.exports = {
  createTable
};
