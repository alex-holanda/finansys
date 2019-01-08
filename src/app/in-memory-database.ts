import { InMemoryDbService } from "angular-in-memory-web-api";

import { Category } from "./pages/categories/shared/category.model"

import { Entry } from "./pages/entries/shared/entry.model";

export class InMemoryDatabase implements InMemoryDbService {

    createDb() { 
        const categories: Category[] = [
            { id: 1, name: "Moradia", description: "Pagamentos de contas a casa" },
            { id: 2, name: "Saúde", description: "Plano de saúde e remédios" },
            { id: 3, name: "Lazer", description: "Cinemas, parque, praia, etc" },
            { id: 4, name: "Salário", description: "Recebimento de salário" },
            { id: 5, name: "Freelas", description: "Trabalhos como freelancer" }
        ];

        const entries: Entry[] = [
            { id: 1, name: 'Gás de Cozinha', categoryId: 1, category: categories[0], paid: true, data: "10/January/2019", amount: "70,80", type:"expense", description: "" } as Entry,
            { id: 2, name: 'Gás de Cozinha', categoryId: 2, category: categories[1], paid: false, data: "10/January/2019", amount: "70,80", type:"renevue", description: "Gás trocado" } as Entry
        ]

        return { categories, entries };
     }
}