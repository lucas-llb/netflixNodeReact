import { Response } from "express";
import { AuthenticatedRequest } from "../middlewares/authMiddleware";
import { userService } from "../services/userService";
import { resolveSoa } from "dns";

export const usersController = {
    watching: async (req: AuthenticatedRequest, res: Response) => {
        const userId = req.user!.id;

        try {
            const watching = await userService.getKeepWatchingList(userId);
            return res.json(watching)
        }
        catch (err){
            if (err instanceof Error){
                return res.status(400).json( { message: err.message });
            }
        }
    },

    show: async (req: AuthenticatedRequest, res: Response) => {
        const user = req.user!;

        try {
            return res.json(user);
        }
        catch (err){
            if (err instanceof Error){
                return res.status(400).json( { message: err.message });
            }
        }
    },

    update: async (req: AuthenticatedRequest, res: Response) => {
        const userId = req.user!.id;
        const { firstName, lastName, phone, email, birth } = req.body;

        try {
            const user = await userService.update(userId, {
                firstName,
                lastName, 
                phone,
                birth,
                email
            });
            return res.json(user);
        }
        catch (err){
            if (err instanceof Error){
                return res.status(400).json( { message: err.message });
            }
        }
    },

    updatePassword: async (req: AuthenticatedRequest, res: Response) => {
        const user = req.user!;
        const { currentPassword, password } = req.body;

        try {
            user.checkPassword(currentPassword, async (err, isSame) => {
                if(err){
                    return res.status(400).json({ message: err.message })
                }
                if(!isSame){
                    return res.status(400).json({ message: 'Password incorrect' })
                }

                await userService.updatePassword(user.id, password);
                return res.status(204).send();
            })
        }
        catch (err){
            if (err instanceof Error){
                return res.status(400).json( { message: err.message });
            }
        }
    },
}