export function getColumns(columnsCount, data) {
   const template = [];

   for (let i = 0; i < columnsCount; i++) {
      template.push([]);
   }

   data.forEach((elem, index) => {
      const column = Math.ceil(index % columnsCount);
      template[column].push(elem);
   });

   return template;
}
