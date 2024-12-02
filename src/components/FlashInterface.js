import React, { useState } from 'react';
import { connectToDevice, readSerialData } from '../services/flashService';
import { Button, Card, Divider, Text } from '@geist-ui/core';


const FlashInterface = () => {
    const [port, setPort] = useState(null);
    const [logs, setLogs] = useState([]);
  
    const connectDevice = async () => {
    try {
        const selectedPort = await connectToDevice(); // Conecta ao dispositivo
        setPort(selectedPort); // Atualiza o estado da porta conectada

        // Iniciar a leitura de dados da porta
        await readSerialData(selectedPort, (data) => {
        setLogs((prevLogs) => [...prevLogs, data]); // Adiciona os dados recebidos ao estado dos logs
        });
    } catch (error) {
        alert('Não foi possível conectar ao dispositivo. Verifique se está conectado corretamente.');
        console.error('Erro na conexão ou leitura:', error); // Log do erro no console para debug
    }
    };
    
    return (
        <div>
            <Text h1>Flash Suite</Text>
            <Button 
                type={port ? 'success' : 'default'} 
                onClick={connectDevice}
                auto
            >
                {port ? 'Dispositivo Conectado' : 'Conectar Dispositivo'}
            </Button>

            <Divider />

            <Card style={{ marginTop: '20px', maxHeight: '200px', overflowY: 'auto' }}>
                <Text h2>Monitor Serial</Text>
                {logs.length > 0 ? (
                <pre style={{ margin: 0, whiteSpace: 'pre', wordBreak: 'break-word' }}>
                    {logs.join('')} {}
                </pre>
                ) : (
                <Text type="secondary" i>
                    Nenhum dado recebido ainda...
                </Text>
                )}
            </Card>
        </div>
    );
  };
  
  export default FlashInterface;