-- CreateTable
CREATE TABLE "Professor" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "matricula" TEXT
);

-- CreateTable
CREATE TABLE "Curso" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "codCurso" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Disciplina" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "codCred" TEXT NOT NULL,
    "cursoId" INTEGER NOT NULL,
    CONSTRAINT "Disciplina_cursoId_fkey" FOREIGN KEY ("cursoId") REFERENCES "Curso" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Turma" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "numero" INTEGER NOT NULL,
    "horario" TEXT NOT NULL,
    "dataInicial" DATETIME NOT NULL,
    "dataFinal" DATETIME NOT NULL,
    "professorId" TEXT NOT NULL,
    "disciplinaId" INTEGER NOT NULL,
    CONSTRAINT "Turma_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "Professor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Turma_disciplinaId_fkey" FOREIGN KEY ("disciplinaId") REFERENCES "Disciplina" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Recurso" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "descricao" TEXT NOT NULL,
    "reservado" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "Sala" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "numeroSala" TEXT NOT NULL,
    "estado" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Sala_id_fkey" FOREIGN KEY ("id") REFERENCES "Recurso" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ReservaRecurso" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "professorId" TEXT NOT NULL,
    "recursoId" TEXT NOT NULL,
    "turmaId" INTEGER NOT NULL,
    "periodo" TEXT NOT NULL,
    "data" DATETIME NOT NULL,
    CONSTRAINT "ReservaRecurso_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "Professor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ReservaRecurso_recursoId_fkey" FOREIGN KEY ("recursoId") REFERENCES "Recurso" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "FaceVector" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "value" REAL NOT NULL,
    "index" INTEGER NOT NULL,
    "professorId" TEXT NOT NULL,
    CONSTRAINT "FaceVector_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "Professor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Professor_matricula_key" ON "Professor"("matricula");

-- CreateIndex
CREATE UNIQUE INDEX "Curso_codCurso_key" ON "Curso"("codCurso");

-- CreateIndex
CREATE UNIQUE INDEX "Disciplina_codCred_key" ON "Disciplina"("codCred");

-- CreateIndex
CREATE UNIQUE INDEX "Turma_numero_key" ON "Turma"("numero");

-- CreateIndex
CREATE UNIQUE INDEX "ReservaRecurso_professorId_recursoId_data_periodo_key" ON "ReservaRecurso"("professorId", "recursoId", "data", "periodo");

-- CreateIndex
CREATE UNIQUE INDEX "FaceVector_professorId_index_key" ON "FaceVector"("professorId", "index");
