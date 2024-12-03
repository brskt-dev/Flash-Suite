/* External Imports */
import * as Icon from '@geist-ui/icons'
import FlashSuiteIcon from './FlashSuiteIcon';
import React, { useState, useEffect } from 'react';
import { Button, Card, Input, Text, Divider, Toggle, Image, Grid, Link, Spacer } from '@geist-ui/core';

/* Internal Imports */
import '../styles/FlashInterface.css';
import Header from './Header';
import { 
    connectToDevice, 
    readSerialData 
} from '../services/flashService';
import { 
    Avatars,
    getUserData, 
    saveUserData, 
    handleAvatarUpload,
    validateUserData 
} from '../services/userService';

const FlashInterface = ({ toggleTheme, currentTheme }) => {
    
    /* Serial Controls */
    const [port, setPort] = useState(null);
    const [logs, setLogs] = useState([]);

    /* User Controls */
    const [user, setUser] = useState({ nickname: '', avatar: null, selectedAvatar: null });
    const [currentStep, setCurrentStep] = useState(1); // Gerencia a etapa atual
    const [errors, setErrors] = useState({ nicknameError: false, avatarError: false });

    /* Carrega dados do usuário ao inicializar */
    useEffect(() => {
        const storedUser = getUserData();
        if (storedUser.nickname && (storedUser.avatar || storedUser.selectedAvatar)) {
            // Caso os dados estejam completos, define o currentStep como 0 (card não exibido)
            setUser({
                nickname: storedUser.nickname,
                avatar: storedUser.avatar,
                selectedAvatar: storedUser.selectedAvatar,
            });
            setCurrentStep(0);
        } else {
            // Caso contrário, inicia o card de configuração
            setUser({
                nickname: '',
                avatar: null,
                selectedAvatar: null,
            });
            setCurrentStep(1);
        }
    }, []);

    /* Handler para eventos relacionados ao usuário */
    const handleUserEvent = async ({ type, payload }) => {
        try {
            switch (type) {
                case 'SAVE_USER':
                    validateUserData(user.nickname, user.avatar, user.selectedAvatar);
                    const updatedUser = saveUserData(user.nickname, user.avatar, user.selectedAvatar);
                    setUser(updatedUser);
                    setCurrentStep(0); // Conclui a configuração do usuário
                    break;
    
                case 'UPDATE_NICKNAME':
                    setUser((prev) => ({ ...prev, nickname: payload }));
                    setErrors((prev) => ({ ...prev, nicknameError: false }));
                    break;
    
                case 'UPDATE_SELECTED_AVATAR':
                    setUser((prev) => ({
                        ...prev,
                        selectedAvatar: payload,
                        avatar: payload === 'upload' ? prev.avatar : prev.avatar || null,
                    }));
                    setErrors((prev) => ({ ...prev, avatarError: false }));
                    break;
    
                case 'UPLOAD_AVATAR':
                    const uploadedAvatar = await handleAvatarUpload(payload);
                    setUser((prev) => ({
                        ...prev,
                        avatar: uploadedAvatar, // Define o avatar carregado
                        selectedAvatar: 'upload', // Marca o upload como selecionado
                    }));
                    setErrors((prev) => ({ ...prev, avatarError: false }));
                    break;
    
                default:
                    throw new Error('Evento de usuário desconhecido.');
            }
        } catch (error) {
            console.error('Erro no evento de usuário:', error.message);
            if (type === 'SAVE_USER') {
                setErrors({
                    nicknameError: error.message.includes('nickname'),
                    avatarError: error.message.includes('avatar'),
                });
            }
        }
    };

    /* Handler para conexão serial */
    const handleConnectDevice = async () => {
        try {
            const selectedPort = await connectToDevice();
            setPort(selectedPort);

            await readSerialData(selectedPort, (data) => {
                setLogs((prevLogs) => [...prevLogs, data]);
            });
        } catch (error) {
            console.error('Erro na conexão ou leitura:', error);
        }
    };
    
    return (
        <div>
            {currentStep > 0 && (
                <div className="overlay">
                    <Grid.Container sm={24} lg={8}>
                        <Card 
                            shadow
                            xs={2}
                            style={{ width: '100%', margin: 'auto', textAlign: 'center'}}
                        >
                            <Grid.Container gap={1} alignItems="center" justify='center'>
                                {/* Ícone SVG */}
                                <Grid style={{ display: 'flex', justifyContent: 'center' }}>
                                    <FlashSuiteIcon width="60px" height="60px" currentTheme={currentTheme}/>
                                </Grid>
                                <Spacer w={0.5}/>
                                <Grid>
                                    <Text h1 style={{ margin: 0 }}>Flash Suite</Text>
                                </Grid>
                            </Grid.Container>
                            <Divider />
                            
                            {currentStep === 1 && (
                            <>
                                <Text h4 type='secondary'>What should we call you?</Text>
                                <Input
                                    label="@"
                                    width="100%"
                                    value={user.nickname}
                                    onChange={(e) =>
                                        handleUserEvent({ type: 'UPDATE_NICKNAME', payload: e.target.value })
                                    }
                                    status={errors.nicknameError ? 'error' : undefined}
                                />
                                {errors.nicknameError && (
                                    <Text small style={{ color: 'red', textAlign: 'left' }}>
                                        Nickname is mandatory.
                                    </Text>
                                )}
                                <Divider />
                                <Button 
                                    auto 
                                    iconRight={<Icon.ChevronRight />} 
                                    type="success" 
                                    onClick={() => setCurrentStep(2)}
                                    disabled={!user.nickname.trim()}
                                    >
                                    Next
                                </Button>
                            </>
                            )}

                            {currentStep === 2 && (
                            <>
                                <Text h4 type='secondary'>Choose an avatar or upload your own:</Text>
                                
                                <div className="avatar-container">
                                    <div
                                        className={`avatar-circle ${user.selectedAvatar === 'avatar1' ? 'selected' : ''}`}
                                        onClick={() =>
                                            handleUserEvent({ type: 'UPDATE_SELECTED_AVATAR', payload: 'avatar1' })
                                        }
                                    >
                                        <img src={Avatars.avatar1} alt="Avatar Padrão 1" />
                                    </div>
                                    <Spacer w={1} />
                                    <div
                                        className={`avatar-circle ${user.selectedAvatar === 'avatar2' ? 'selected' : ''}`}
                                        onClick={() =>
                                            handleUserEvent({ type: 'UPDATE_SELECTED_AVATAR', payload: 'avatar2' })
                                        }
                                    >
                                        <img src={Avatars.avatar2} alt="Avatar Padrão 2" />
                                    </div>
                                    <Spacer w={1} />
                                    <div
                                        className={`avatar-circle ${user.selectedAvatar === 'upload' ? 'selected' : ''}`}
                                        onClick={() => document.getElementById('avatarInput').click()}
                                    >
                                        {user.avatar ? (
                                            <img src={user.avatar} alt="Avatar Personalizado" />
                                        ) : (
                                            <span className="avatar-placeholder">
                                                <Icon.Upload/>
                                            </span>
                                        )}
                                        <input
                                            id="avatarInput"
                                            type="file"
                                            accept="image/*"
                                            style={{ display: 'none' }}
                                            onChange={(e) => {
                                                handleUserEvent({ type: 'UPLOAD_AVATAR', payload: e.target.files[0] });
                                                handleUserEvent({ type: 'UPDATE_SELECTED_AVATAR', payload: 'upload' });
                                            }}
                                        />
                                    </div>
                                </div>

                                {errors.avatarError && (
                                    <Text small style={{ color: 'red', textAlign: 'left' }}>
                                        Please, select or upload an avatar.
                                    </Text>
                                )}
                                <Divider />

                                
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Button auto icon={<Icon.ChevronLeft />} type="abort" onClick={() => setCurrentStep(1)}>
                                        Back
                                    </Button>
                                    <Button auto iconRight={<Icon.Save />} type="success" onClick={() => handleUserEvent({ type: 'SAVE_USER' })}>
                                        Save
                                    </Button>
                                </div>
                            </>
                            )}

                            <Card.Footer>
                                <Link color icon target="_blank" href="https://github.com/brskt-dev/Flash-Suite" 
                                    style={{display: 'flex', alignItems: 'center'}}>
                                    <Icon.Github size={16} />Visit source code on GitHub.
                                </Link>
                            </Card.Footer>
                        </Card>
                    </Grid.Container>
                </div>
            )}

            {currentStep === 0 && (
                <div>
                    <Header 
                        user={user} 
                        setUser={setUser} 
                        toggleTheme={toggleTheme} 
                        currentTheme={currentTheme} 
                    />

                    <Button
                        type={port ? 'success' : 'default'}
                        onClick={handleConnectDevice}
                        auto
                    >
                        {port ? 'Dispositivo Conectado' : 'Conectar Dispositivo'}
                    </Button>
    
                    <Divider />
    
                    <Card style={{ marginTop: '20px', maxHeight: '200px', overflowY: 'auto' }}>
                        <Text h2>Monitor Serial</Text>
                        {logs.length > 0 ? (
                            <pre
                                style={{
                                    margin: 0,
                                    whiteSpace: 'pre',
                                    wordBreak: 'break-word',
                                }}
                            >
                                {logs.join('')} {}
                            </pre>
                        ) : (
                            <Text type="secondary" i>
                                Nenhum dado recebido ainda...
                            </Text>
                        )}
                    </Card>
                </div>
            )}
        </div>
    );
};

export default FlashInterface;
