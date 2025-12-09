import * as authService from "../services/authService.js";
import { usersToCreate } from "./usersList.js";

export async function buatBanyakUser() {
    for(const userData of usersToCreate) {
        try {
            const userDataFixed = { 
                ...userData, 
                password: String(userData.password) 
            };

            const user = await authService.registerUser(userDataFixed);

            console.log(`User created: ${user.nim} - ${user.name}`);
        } 
        catch (error) {
            console.error(`
                Error creating user ${userData.nim}: ${error.message}`
            );
        }
        await new Promise(resolve => setTimeout(resolve, 100));
    }
    console.log("Seeder Users selesai ✅");
}

(async () => {
    await buatBanyakUser();
})();
