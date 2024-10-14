const createLikeButtonTemplate = () => `
    <button aria-label="like this resto" id="likeButton" class="like">
        <i class="fa-regular fa-heart" aria-hidden="true"></i>
    </button>
`;

const createUnlikeButtonTemplate = () => `
    <button aria-label="unlike this resto" id="likeButton" class="like">
        <i class="fa-solid fa-heart" aria-hidden="true"></i>
    </button>
`;

export { createLikeButtonTemplate, createUnlikeButtonTemplate };
