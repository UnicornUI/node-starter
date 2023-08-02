fetch("/api/list")
  .then((result) => {
    console.log(result);
    return result.json();
  })
  .then((json) => {
    console.log(json);
    let temp = `
     <ul>
        {{ each data }}
          <li> {{ $value }} </li>
        {{/each}}
     </ul>
    `;
    let html = template.render(temp, { data: json.data });
    document.querySelector("#list").innerHTML = html;
  });
