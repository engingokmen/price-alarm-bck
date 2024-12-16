export let price = 0;

const connectWebSocket = () => {
  const ws = new WebSocket("wss://stream.binance.com:9443/ws/btcusdt@trade");

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data && data.p) {
      price = parseFloat(data.p);
    }
  };

  ws.onerror = (error: Event) => {
    const errorEvent = error as ErrorEvent;
    console.error("WebSocket error:", errorEvent.message);
  };

  ws.onclose = () => {
    console.log("WebSocket disconnected");
  };
};

connectWebSocket();
