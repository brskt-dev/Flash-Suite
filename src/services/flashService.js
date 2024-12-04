// Conecta ao dispositivo e retorna a porta aberta
export const connectToDevice = async () => {
    try {
      const port = await navigator.serial.requestPort();
      await port.open({ baudRate: 115200 });
      console.log('Dispositivo conectado:', port);
      return port;
    } catch (error) {
      console.error('Erro ao conectar ao dispositivo:', error);
      throw error;
    }
  };
  
// Lê dados da porta serial e executa um callback para processá-los
export const readSerialData = async (port, onDataReceived) => {
  try {
    const textDecoder = new TextDecoderStream();
    const readableStreamClosed = port.readable.pipeTo(textDecoder.writable);
    const reader = textDecoder.readable.getReader();

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      if (value) {
        console.log('Dados recebidos:', value); // Log dos dados para debug
        onDataReceived(value); // Callback com os dados recebidos
      }
    }

    reader.releaseLock();
  } catch (error) {
    console.error('Erro ao ler dados da porta serial:', error);
    throw error;
  }
};
  