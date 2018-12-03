import { InMemoryDbService } from "angular-in-memory-web-api";

import { Category } from "./pages/categories/shared/category.model"

export class InMemoryDatabase implements InMemoryDbService {

    createDb() { 
        const categories: Category[] = [
            { id: 1, name: "Moradia", description: "Pagamentos de contas a casa" },
            { id: 2, name: "Saúde", description: "Plano de saúde e remédios" },
            { id: 3, name: "Lazer", description: "Cinemas, parque, praia, etc" },
            { id: 4, name: "Salário", description: "Recebimento de salário" },
            { id: 5, name: "Freelas", description: "Trabalhos como freelancer" }
        ];

        return { categories };
     }
}