import * as fs from "fs";
import * as path from "path";

const schedulerPath = path.resolve(process.cwd(), 'app', 'scheduler');

const run = () => {
    try {
        const state = fs.lstatSync(schedulerPath);
        if (state.isDirectory()) {
            fs.readdirSync(schedulerPath).forEach(file => {
                if (file.indexOf('.ts') !== -1 || file.indexOf('.js') !== -1) {
                    require(path.resolve(schedulerPath, file))();
                }
            });
        }
    } catch (error) {
        console.log(error);
    }
};

export default run;