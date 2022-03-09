export const sortArray = (array) => {

    const createObjectWithSortedValue = array
    .map(data => 

    {
        
        return {
            name: data,
            sortValue: Math.random()
        }

    })

    const randomizeItemsPosition = createObjectWithSortedValue
    .sort((x,y) => x.sortValue - y.sortValue);

    const originalArraySorted = randomizeItemsPosition
    .map(data => data.name);

    return originalArraySorted

}

export const createHTMLofItems = (index, person, objList) => {

    const personBirth = new Date(person.birthDate);

    return `

    <div class="draggable" draggable="true">
    <span class="number">${index+1}</span>

        <p class="person-name">${person.personName}</p>

        <div class="navigation">
            <i class="fas fa-grip-lines select-bar"></i>
            <i class="fa-solid fa-arrow-down-wide-short open-bio"></i>
        </div>
    </div>

    <div class="bio hidden">
        <p>${person.bios[0]}</p>
        <em>Source: ${person.source}</em>
        <br>
        <em>Year of Birthday: ${personBirth.getUTCFullYear()}</em>

    
    </div>

`
}
//square image + source