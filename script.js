// Flashcard Application - Main JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // ==========================================
    // DATA MANAGEMENT
    // ==========================================
    
    // Sample flashcards data
    const flashcardsData = [
        {
            id: 1,
            front: "What is the capital of France?",
            back: "<strong>Paris</strong><p>Paris is the capital and most populous city of France.</p>",
            deck: "World Capitals",
            tags: ["Geography", "Europe", "Capitals"],
            box: 2,
            nextReview: "Tomorrow"
        },
        {
            id: 2,
            front: "What is the capital of Japan?",
            back: "<strong>Tokyo</strong><p>Tokyo is the capital and largest city of Japan.</p>",
            deck: "World Capitals",
            tags: ["Geography", "Asia", "Capitals"],
            box: 1,
            nextReview: "Today"
        },
        {
            id: 3,
            front: "What is the capital of Brazil?",
            back: "<strong>Brasília</strong><p>Brasília is the federal capital of Brazil and seat of government of the Federal District.</p>",
            deck: "World Capitals",
            tags: ["Geography", "South America", "Capitals"],
            box: 3,
            nextReview: "Next week"
        },
        {
            id: 4,
            front: "What is the capital of Australia?",
            back: "<strong>Canberra</strong><p>Canberra is the capital city of Australia and the largest inland city.</p>",
            deck: "World Capitals",
            tags: ["Geography", "Oceania", "Capitals"],
            box: 1,
            nextReview: "Today"
        },
        {
            id: 5,
            front: "What is the capital of Egypt?",
            back: "<strong>Cairo</strong><p>Cairo is the capital of Egypt and the largest city in the Arab world.</p>",
            deck: "World Capitals",
            tags: ["Geography", "Africa", "Capitals"],
            box: 2,
            nextReview: "Tomorrow"
        }
    ];
    
    // Current state
    let currentDeck = "World Capitals";
    let currentCardIndex = 0;
    let currentView = "flashcard-view"; // Default view
    
    // ==========================================
    // NAVIGATION & SCREEN MANAGEMENT
    // ==========================================
    
    // Show only the selected view, hide others
    function showView(viewId) {
        // Hide all sections
        document.querySelectorAll('section.mockup-section').forEach(section => {
            section.style.display = 'none';
        });
        
        // Show the selected section
        const selectedSection = document.getElementById(viewId);
        if (selectedSection) {
            selectedSection.style.display = 'block';
            currentView = viewId;
            
            // If switching to flashcard view, update the card display
            if (viewId === 'flashcard-view') {
                updateFlashcardDisplay();
            }
        }
    }
    
    // Initialize by showing only the default view
    showView(currentView);
    
    // Navigation menu click handlers
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1); // Remove the # from href
            showView(targetId);
        });
    });
    
    // ==========================================
    // FLASHCARD FUNCTIONALITY
    // ==========================================
    
    // Update the flashcard display with current card data
    function updateFlashcardDisplay() {
        const currentCard = flashcardsData[currentCardIndex];
        const flashcardContainer = document.querySelector('.flashcard-container');
        
        if (flashcardContainer && currentCard) {
            // Update progress indicator
            const progressText = flashcardContainer.querySelector('.progress-text');
            const progressFill = flashcardContainer.querySelector('.progress-fill');
            
            if (progressText) {
                progressText.textContent = `Card ${currentCardIndex + 1} of ${flashcardsData.length}`;
            }
            
            if (progressFill) {
                const progressPercentage = ((currentCardIndex + 1) / flashcardsData.length) * 100;
                progressFill.style.width = `${progressPercentage}%`;
            }
            
            // Update card content
            const frontContent = flashcardContainer.querySelector('.flashcard-front .card-content');
            const backContent = flashcardContainer.querySelector('.flashcard-back .card-content');
            
            if (frontContent) {
                frontContent.innerHTML = `<h3>${currentCard.front}</h3>`;
            }
            
            if (backContent) {
                backContent.innerHTML = `<h3>${currentCard.back}</h3>`;
            }
            
            // Update SRS info
            const srsBox = flashcardContainer.querySelector('.srs-box');
            const nextReview = flashcardContainer.querySelector('.next-review');
            
            if (srsBox) {
                srsBox.textContent = `Box ${currentCard.box}`;
            }
            
            if (nextReview) {
                nextReview.textContent = `Next review: ${currentCard.nextReview}`;
            }
            
            // Reset flip state
            const flashcard = document.getElementById('demo-card');
            if (flashcard && flashcard.classList.contains('flipped')) {
                flashcard.classList.remove('flipped');
            }
        }
    }
    
    // Flashcard flip functionality
    const demoCard = document.getElementById('demo-card');
    if (demoCard) {
        demoCard.addEventListener('click', function() {
            this.classList.toggle('flipped');
        });
    }
    
    // Navigation buttons (Previous/Next)
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const isPrevBtn = this.classList.contains('prev-btn');
            
            if (isPrevBtn) {
                // Go to previous card
                currentCardIndex = (currentCardIndex > 0) ? 
                    currentCardIndex - 1 : flashcardsData.length - 1;
            } else {
                // Go to next card
                currentCardIndex = (currentCardIndex < flashcardsData.length - 1) ? 
                    currentCardIndex + 1 : 0;
            }
            
            updateFlashcardDisplay();
        });
    });
    
    // Response buttons (Know/Don't Know)
    const responseButtons = document.querySelectorAll('.response-btn');
    responseButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const isKnowBtn = this.classList.contains('know-btn');
            
            if (isKnowBtn) {
                // Simulate moving to a higher box
                const currentBox = flashcardsData[currentCardIndex].box;
                if (currentBox < 5) {
                    flashcardsData[currentCardIndex].box = currentBox + 1;
                    flashcardsData[currentCardIndex].nextReview = "Next week";
                }
            } else {
                // Simulate moving to box 1
                flashcardsData[currentCardIndex].box = 1;
                flashcardsData[currentCardIndex].nextReview = "Today";
            }
            
            // Move to next card
            currentCardIndex = (currentCardIndex < flashcardsData.length - 1) ? 
                currentCardIndex + 1 : 0;
            
            updateFlashcardDisplay();
        });
    });
    
    // ==========================================
    // DECK LIST FUNCTIONALITY
    // ==========================================
    
    // Filter buttons
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // In a real app, this would filter the decks
            // For now, just show a message
            const filterType = this.textContent;
            console.log(`Filtering decks by: ${filterType}`);
        });
    });
    
    // Favorite button toggle
    const favoriteBtns = document.querySelectorAll('.favorite-btn');
    favoriteBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const isFavorite = this.textContent === '★';
            this.textContent = isFavorite ? '☆' : '★';
            
            const deckCard = this.closest('.deck-card');
            if (deckCard) {
                deckCard.classList.toggle('favorite');
            }
        });
    });
    
    // Make deck cards clickable
    const deckCards = document.querySelectorAll('.deck-card:not(.new-deck)');
    deckCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't trigger if clicking on a button inside the card
            if (!e.target.closest('button')) {
                const deckName = this.querySelector('h3').textContent;
                currentDeck = deckName;
                
                // Filter flashcards to this deck
                const deckFlashcards = flashcardsData.filter(card => card.deck === deckName);
                if (deckFlashcards.length > 0) {
                    // Switch to flashcard view
                    showView('flashcard-view');
                } else {
                    alert(`No flashcards found in deck: ${deckName}`);
                }
            }
        });
    });
    
    // New deck card click
    const newDeckCard = document.querySelector('.new-deck');
    if (newDeckCard) {
        newDeckCard.addEventListener('click', function() {
            const deckName = prompt("Enter a name for your new deck:");
            if (deckName && deckName.trim() !== "") {
                alert(`New deck created: ${deckName}`);
                // In a real app, this would add a new deck to the grid
            }
        });
    }
    
    // Study button click
    const studyBtns = document.querySelectorAll('.study-btn');
    studyBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const deckCard = this.closest('.deck-card');
            const deckName = deckCard.querySelector('h3').textContent;
            currentDeck = deckName;
            
            // Switch to flashcard view
            showView('flashcard-view');
        });
    });
    
    // Search functionality
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
    
    if (searchInput && searchBtn) {
        searchBtn.addEventListener('click', function() {
            const searchTerm = searchInput.value.trim().toLowerCase();
            if (searchTerm) {
                alert(`Searching for: ${searchTerm}`);
                // In a real app, this would filter the decks
            }
        });
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchBtn.click();
            }
        });
    }
    
    // Create new deck button
    const createDeckBtn = document.querySelector('.create-deck-btn');
    if (createDeckBtn) {
        createDeckBtn.addEventListener('click', function() {
            const deckName = prompt("Enter a name for your new deck:");
            if (deckName && deckName.trim() !== "") {
                alert(`New deck created: ${deckName}`);
                // In a real app, this would add a new deck to the grid
            }
        });
    }
    
    // ==========================================
    // CARD EDITOR FUNCTIONALITY
    // ==========================================
    
    // Preview card flip functionality
    const previewCard = document.querySelector('.preview-card');
    const previewFlipBtn = document.querySelector('.preview-flip-btn');
    
    if (previewCard && previewFlipBtn) {
        previewFlipBtn.addEventListener('click', function() {
            previewCard.classList.toggle('flipped');
        });
    }
    
    // Live preview update
    const frontEditorField = document.querySelector('.card-side:nth-child(1) .editor-field');
    const backEditorField = document.querySelector('.card-side:nth-child(2) .editor-field');
    const previewFront = document.querySelector('.preview-front .preview-content');
    const previewBack = document.querySelector('.preview-back .preview-content');
    
    if (frontEditorField && previewFront) {
        frontEditorField.addEventListener('input', function() {
            previewFront.innerHTML = this.innerHTML;
        });
    }
    
    if (backEditorField && previewBack) {
        backEditorField.addEventListener('input', function() {
            previewBack.innerHTML = this.innerHTML;
        });
    }
    
    // Add tag functionality
    const addTagBtn = document.querySelector('.add-tag-btn');
    const tagInput = document.querySelector('.tag-input');
    const tagsContainer = document.querySelector('.tags-container');
    
    if (addTagBtn && tagInput && tagsContainer) {
        addTagBtn.addEventListener('click', function() {
            const tagText = tagInput.value.trim();
            if (tagText) {
                const tagElement = document.createElement('div');
                tagElement.className = 'tag';
                tagElement.textContent = tagText;
                
                // Insert before the input container
                const tagInputContainer = document.querySelector('.tag-input-container');
                tagsContainer.insertBefore(tagElement, tagInputContainer);
                
                // Clear input
                tagInput.value = '';
            }
        });
        
        // Allow pressing Enter to add a tag
        tagInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                addTagBtn.click();
            }
        });
    }
    
    // Format buttons
    const formatBtns = document.querySelectorAll('.format-btn');
    formatBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const formatType = this.textContent.trim();
            const editorField = this.closest('.card-side').querySelector('.editor-field');
            
            if (editorField) {
                const selection = window.getSelection();
                if (selection.rangeCount > 0) {
                    const range = selection.getRangeAt(0);
                    
                    // Apply formatting based on button
                    switch(formatType) {
                        case 'B':
                            document.execCommand('bold', false);
                            break;
                        case 'I':
                            document.execCommand('italic', false);
                            break;
                        case 'U':
                            document.execCommand('underline', false);
                            break;
                        case 'List':
                            document.execCommand('insertUnorderedList', false);
                            break;
                        case 'Code':
                            const codeElement = document.createElement('code');
                            codeElement.textContent = selection.toString();
                            range.deleteContents();
                            range.insertNode(codeElement);
                            break;
                        case 'Image':
                            const imageUrl = prompt('Enter image URL:');
                            if (imageUrl) {
                                const imgElement = document.createElement('img');
                                imgElement.src = imageUrl;
                                imgElement.style.maxWidth = '100%';
                                range.deleteContents();
                                range.insertNode(imgElement);
                            }
                            break;
                    }
                    
                    // Update preview
                    if (editorField === frontEditorField && previewFront) {
                        previewFront.innerHTML = frontEditorField.innerHTML;
                    } else if (editorField === backEditorField && previewBack) {
                        previewBack.innerHTML = backEditorField.innerHTML;
                    }
                }
            }
        });
    });
    
    // Save button
    const saveBtn = document.querySelector('.save-btn');
    if (saveBtn) {
        saveBtn.addEventListener('click', function() {
            if (frontEditorField && backEditorField) {
                const front = frontEditorField.innerHTML;
                const back = backEditorField.innerHTML;
                const deckSelect = document.getElementById('deck-select');
                const selectedDeck = deckSelect ? deckSelect.value : currentDeck;
                
                // Get tags
                const tags = [];
                document.querySelectorAll('.tag').forEach(tag => {
                    if (!tag.classList.contains('tag-input-container')) {
                        tags.push(tag.textContent);
                    }
                });
                
                // Create new card
                const newCard = {
                    id: flashcardsData.length + 1,
                    front: front,
                    back: back,
                    deck: selectedDeck,
                    tags: tags,
                    box: 1,
                    nextReview: "Today"
                };
                
                // Add to data
                flashcardsData.push(newCard);
                
                alert('Card saved successfully!');
                
                // Return to deck list
                showView('deck-list');
            }
        });
    }
    
    // Save & Add Another button
    const saveNewBtn = document.querySelector('.save-new-btn');
    if (saveNewBtn) {
        saveNewBtn.addEventListener('click', function() {
            if (frontEditorField && backEditorField) {
                const front = frontEditorField.innerHTML;
                const back = backEditorField.innerHTML;
                const deckSelect = document.getElementById('deck-select');
                const selectedDeck = deckSelect ? deckSelect.value : currentDeck;
                
                // Get tags
                const tags = [];
                document.querySelectorAll('.tag').forEach(tag => {
                    if (!tag.classList.contains('tag-input-container')) {
                        tags.push(tag.textContent);
                    }
                });
                
                // Create new card
                const newCard = {
                    id: flashcardsData.length + 1,
                    front: front,
                    back: back,
                    deck: selectedDeck,
                    tags: tags,
                    box: 1,
                    nextReview: "Today"
                };
                
                // Add to data
                flashcardsData.push(newCard);
                
                alert('Card saved successfully! Add another card.');
                
                // Clear form for next card
                frontEditorField.innerHTML = '';
                backEditorField.innerHTML = '';
                previewFront.innerHTML = '';
                previewBack.innerHTML = '';
                
                // Clear tags
                const tagElements = document.querySelectorAll('.tag:not(.tag-input-container)');
                tagElements.forEach(tag => {
                    if (!tag.classList.contains('tag-input-container')) {
                        tag.remove();
                    }
                });
            }
        });
    }
    
    // Cancel button
    const cancelBtn = document.querySelector('.cancel-btn');
    if (cancelBtn) {
        cancelBtn.addEventListener('click', function() {
            // Return to deck list
            showView('deck-list');
        });
    }
    
    // ==========================================
    // PROGRESS VIEW FUNCTIONALITY
    // ==========================================
    
    // Time filter buttons
    const timeBtns = document.querySelectorAll('.time-btn');
    timeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            timeBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // In a real app, this would update the statistics
            const timeRange = this.textContent;
            console.log(`Showing statistics for time range: ${timeRange}`);
        });
    });
    
    // ==========================================
    // INITIALIZE APPLICATION
    // ==========================================
    
    // Initialize the flashcard display
    updateFlashcardDisplay();
    
    // Add button to create new card from deck list
    const deckMenuBtns = document.querySelectorAll('.deck-menu-btn');
    deckMenuBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const deckCard = this.closest('.deck-card');
            const deckName = deckCard.querySelector('h3').textContent;
            currentDeck = deckName;
            
            // Set the deck in the editor
            const deckSelect = document.getElementById('deck-select');
            if (deckSelect) {
                for (let i = 0; i < deckSelect.options.length; i++) {
                    if (deckSelect.options[i].text === deckName) {
                        deckSelect.selectedIndex = i;
                        break;
                    }
                }
            }
            
            // Switch to card editor
            showView('card-editor');
        });
    });
});
