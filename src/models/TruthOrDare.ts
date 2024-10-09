import { TruthOrDare as TruthOrDareDB } from "@prisma/client";

type TruthOrDare = Pick<TruthOrDareDB, "question" | "type">;

export default TruthOrDare;
