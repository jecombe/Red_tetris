const tab = Array.from(Array(20), () => new Array(10).fill([0, 'clear']));

tab[17] = [[0, 'clear'],[0, 'clear'],[0, 'clear'], [0, 'clear'],[1, 'merged'],[0, 'clear'],[1, 'merged'],[0, 'clear'],[0, 'clear'], [0, 'clear']];
tab[18] = [[1, 'merged'],[1, 'merged'],[1, 'merged'], [1, 'merged'],[1, 'merged'],[1, 'merged'],[1, 'merged'],[1, 'merged'],[1, 'merged'], [1, 'merged']];
tab[19] = [[0, 'clear'],[0, 'clear'],[0, 'clear'], [0, 'clear'],[1, 'merged'],[0, 'clear'],[1, 'merged'],[0, 'clear'],[0, 'clear'], [0, 'clear']];

function is_full(currentValue)
{
  return (currentValue[1] === 'merged');

}
tab.forEach((row) => {
    let full_line = row.every(is_full)

    if (full_line === true)
    {
      full = 1;
      console.log("FULL LINE BEFORE", row);
      let res = tab.indexOf(row)
      console.log(res);

      row.fill([0, 'clear']);
      tab.splice(res, 1);
      tab.unshift(new Array(10).fill([0, 'clear']));

    }
});

console.log("TABLEAU PRINCIPAL BEFORE ", tab);
