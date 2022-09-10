import { server } from "./app";

function start(): void {

    server.listen(3000, () => {
        console.log(`listening to port:3000`);
    });

}

start();
