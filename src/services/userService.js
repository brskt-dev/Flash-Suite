export const Avatars = {
    avatar1: "https://cdn.jsdelivr.net/gh/alohe/avatars/png/notion_1.png",
    avatar2: "https://cdn.jsdelivr.net/gh/alohe/avatars/png/notion_6.png",
};

// Recupera os dados do usuário armazenados no localStorage
export const getUserData = () => {
    const nickname = localStorage.getItem('nickname');
    const avatar = localStorage.getItem('avatar');
    const selectedAvatar = localStorage.getItem('selectedAvatar');
    return { nickname, avatar, selectedAvatar };
};

// Salva os dados do usuário no localStorage
export const saveUserData = (nickname, avatar, selectedAvatar) => {
    let avatarToSave = avatar;

    // Verifica se o avatar selecionado é um dos padrões e salva sua URL
    if (selectedAvatar === 'avatar1') {
        avatarToSave = Avatars.avatar1;
    } else if (selectedAvatar === 'avatar2') {
        avatarToSave = Avatars.avatar2;
    }

    localStorage.setItem('nickname', nickname);
    localStorage.setItem('avatar', avatarToSave); // Sempre salva a URL ou imagem do avatar atual
    localStorage.setItem('selectedAvatar', selectedAvatar);

    return { nickname, avatar: avatarToSave, selectedAvatar };
};

// Lida com o upload de avatar e retorna os dados processados
export const handleAvatarUpload = (file) => {
    return new Promise((resolve, reject) => {
        if (!file) {
            reject(new Error("No file selected."));
        }
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result); // Retorna o avatar como Base64
        reader.onerror = () => reject(new Error("Error processing file."));
        reader.readAsDataURL(file);
    });
};

// Valida se os dados do usuário estão completos
export const validateUserData = (nickname, avatar, selectedAvatar) => {
    if (!nickname.trim()) {
        throw new Error("The nickname is mandatory.");
    }
    if (!avatar && !selectedAvatar) {
        throw new Error("Please, select or upload an avatar.");
    }
};
