const tagItems = document.querySelectorAll('.job-listings-tags-item');
const selectedTagsContainer = document.querySelector('.selected-tags');

// Обработчик клика на каждом теге
tagItems.forEach(tag => {
    tag.addEventListener('click', () => {
        const selectedTag = tag.textContent.trim();

        // Проверяем, выбран ли уже этот тег
        const isSelected = selectedTagsContainer.querySelector(`[data-tag="${selectedTag}"]`);
        if (isSelected) {
            // isSelected.remove();
        } else {
            // Иначе добавляем его в список выбранных
            selectedTagsContainer.style.display = 'flex';
            const selectedTagElement = document.createElement('li');
            selectedTagElement.textContent = selectedTag;
            selectedTagElement.setAttribute('data-tag', selectedTag);
            selectedTagElement.classList.add('selected-tag');
            selectedTagsContainer.prepend(selectedTagElement);
            
            // Добавляем кнопку удаления тега
            const closeTag = document.createElement('span');
            closeTag.classList.add('close-tag');
            selectedTagElement.prepend(closeTag);

            // Обработчик клика на кнопке удаления тега
            closeTag.addEventListener('click', (event) => {
                event.stopPropagation();
                selectedTagElement.remove();
                filterAndDisplayItems();
            });
            // Clear Tags
            const clearTags = document.querySelector('.clear-tags');
            clearTags.addEventListener('click', () => {
                selectedTagElement.remove();
                
                filterAndDisplayItems();
            })
        }
        filterAndDisplayItems();
    });
});



// Функция для сортировки и отображения элементов по выбранным тегам
function filterAndDisplayItems() {
    // Получаем выбранные теги
    const selectedTags = Array.from(selectedTagsContainer.querySelectorAll('.selected-tag')).map(tag => tag.textContent.trim().toLowerCase());

    // Получаем все элементы job-listings-item
    const jobItems = document.querySelectorAll('.job-listings-item');

    // Показываем все элементы, если не выбрано ни одного тега
    if (selectedTags.length === 0) {
        selectedTagsContainer.style.display = 'none';
        jobItems.forEach(item => {
            item.style.display = 'flex';
        });
        return;
    }

    // Скрываем все элементы, чтобы затем показать только те, которые соответствуют выбранным тегам
    jobItems.forEach(item => {
        item.style.display = 'none';
    });

    // Показываем только элементы, которые соответствуют выбранным тегам
    jobItems.forEach(item => {
        const tags = Array.from(item.querySelectorAll('.job-listings-tags-item')).map(tag => tag.textContent.trim().toLowerCase());
        if (selectedTags.every(tag => tags.includes(tag))) {
            item.style.display = 'flex';
        }
    });
};