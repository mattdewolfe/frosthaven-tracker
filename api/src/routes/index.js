import { Router } from "express";
import indexRoutes from "./indexRoutes";
import enumRoutes from "./enumRoutes";
import playerRoutes from "./playerRoutes";

const router = Router();

router.use('/', indexRoutes);
router.use('/enum', enumRoutes);
router.use('/players', playerRoutes);

// Handle 404 errors
router.use((req, res) => {
    res.status(404).json({
        success: false,
        errors: [{
            message: `Could not find route: ${req.originalUrl}`,
        }],
    });
});

export default router;
