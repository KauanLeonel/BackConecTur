-- CreateTable
CREATE TABLE `Usuario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `senha` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Usuario_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Empresa` (
    `usuarioId` INTEGER NOT NULL,
    `cnpj` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Empresa_cnpj_key`(`cnpj`),
    PRIMARY KEY (`usuarioId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cidadao` (
    `usuarioId` INTEGER NOT NULL,

    PRIMARY KEY (`usuarioId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Administrador` (
    `usuarioId` INTEGER NOT NULL,
    `prontuario` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Administrador_prontuario_key`(`prontuario`),
    PRIMARY KEY (`usuarioId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Evento` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `descricao` VARCHAR(191) NULL,
    `data_hora` DATETIME(3) NOT NULL,
    `categoria` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Localizacao` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `latitude` DOUBLE NOT NULL,
    `longitude` DOUBLE NOT NULL,
    `endereco` VARCHAR(191) NOT NULL,
    `eventoId` INTEGER NOT NULL,

    UNIQUE INDEX `Localizacao_eventoId_key`(`eventoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PreferenciasNotificacao` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cidadaoId` INTEGER NOT NULL,
    `notificacao_push` BOOLEAN NOT NULL DEFAULT true,
    `notificacao_email` BOOLEAN NOT NULL DEFAULT true,
    `frequencia` VARCHAR(191) NULL,

    UNIQUE INDEX `PreferenciasNotificacao_cidadaoId_key`(`cidadaoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ConfiguracoesGerais` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cidadaoId` INTEGER NOT NULL,
    `tema` VARCHAR(191) NOT NULL DEFAULT 'claro',
    `idioma` VARCHAR(191) NOT NULL DEFAULT 'pt-BR',
    `receber_email` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `ConfiguracoesGerais_cidadaoId_key`(`cidadaoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Notificacao` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `mensagem` VARCHAR(191) NOT NULL,
    `data_hora_envio` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `cidadaoId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Conquista` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cidadaoId` INTEGER NOT NULL,
    `moedas` INTEGER NOT NULL DEFAULT 0,
    `nivel` INTEGER NOT NULL DEFAULT 1,
    `progresso` DOUBLE NOT NULL DEFAULT 0,

    UNIQUE INDEX `Conquista_cidadaoId_key`(`cidadaoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Missao` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `descricao` VARCHAR(191) NOT NULL,
    `premio` VARCHAR(191) NULL,
    `concluido` BOOLEAN NOT NULL DEFAULT false,
    `conquistasId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Loja` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL DEFAULT 'Loja Principal',

    UNIQUE INDEX `Loja_nome_key`(`nome`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Sorteio` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `descricao` VARCHAR(191) NULL,
    `data_sorteio` DATETIME(3) NOT NULL,
    `lojaId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cupom` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `descricao` VARCHAR(191) NOT NULL,
    `data_validade` DATETIME(3) NOT NULL,
    `lojaId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Favorito` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cidadaoId` INTEGER NOT NULL,
    `eventoId` INTEGER NOT NULL,
    `dataFavoritado` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Favorito_cidadaoId_eventoId_key`(`cidadaoId`, `eventoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Historico` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cidadaoId` INTEGER NOT NULL,
    `eventoId` INTEGER NOT NULL,
    `dataAcesso` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EventoCidadao` (
    `cidadaoId` INTEGER NOT NULL,
    `eventoId` INTEGER NOT NULL,
    `dataAssociacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`cidadaoId`, `eventoId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EventoEmpresa` (
    `empresaId` INTEGER NOT NULL,
    `eventoId` INTEGER NOT NULL,
    `dataCadastro` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`empresaId`, `eventoId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EventoAdministrador` (
    `administradorId` INTEGER NOT NULL,
    `eventoId` INTEGER NOT NULL,
    `dataAdministracao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`administradorId`, `eventoId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cidadaoCupomResgatado` (
    `cidadaoId` INTEGER NOT NULL,
    `cupomId` INTEGER NOT NULL,
    `dataResgate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`cidadaoId`, `cupomId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Empresa` ADD CONSTRAINT `Empresa_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuario`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cidadao` ADD CONSTRAINT `Cidadao_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuario`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Administrador` ADD CONSTRAINT `Administrador_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuario`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Localizacao` ADD CONSTRAINT `Localizacao_eventoId_fkey` FOREIGN KEY (`eventoId`) REFERENCES `Evento`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PreferenciasNotificacao` ADD CONSTRAINT `PreferenciasNotificacao_cidadaoId_fkey` FOREIGN KEY (`cidadaoId`) REFERENCES `Cidadao`(`usuarioId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ConfiguracoesGerais` ADD CONSTRAINT `ConfiguracoesGerais_cidadaoId_fkey` FOREIGN KEY (`cidadaoId`) REFERENCES `Cidadao`(`usuarioId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notificacao` ADD CONSTRAINT `Notificacao_cidadaoId_fkey` FOREIGN KEY (`cidadaoId`) REFERENCES `Cidadao`(`usuarioId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Conquista` ADD CONSTRAINT `Conquista_cidadaoId_fkey` FOREIGN KEY (`cidadaoId`) REFERENCES `Cidadao`(`usuarioId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Missao` ADD CONSTRAINT `Missao_conquistasId_fkey` FOREIGN KEY (`conquistasId`) REFERENCES `Conquista`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sorteio` ADD CONSTRAINT `Sorteio_lojaId_fkey` FOREIGN KEY (`lojaId`) REFERENCES `Loja`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cupom` ADD CONSTRAINT `Cupom_lojaId_fkey` FOREIGN KEY (`lojaId`) REFERENCES `Loja`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Favorito` ADD CONSTRAINT `Favorito_cidadaoId_fkey` FOREIGN KEY (`cidadaoId`) REFERENCES `Cidadao`(`usuarioId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Favorito` ADD CONSTRAINT `Favorito_eventoId_fkey` FOREIGN KEY (`eventoId`) REFERENCES `Evento`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Historico` ADD CONSTRAINT `Historico_cidadaoId_fkey` FOREIGN KEY (`cidadaoId`) REFERENCES `Cidadao`(`usuarioId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Historico` ADD CONSTRAINT `Historico_eventoId_fkey` FOREIGN KEY (`eventoId`) REFERENCES `Evento`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EventoCidadao` ADD CONSTRAINT `EventoCidadao_cidadaoId_fkey` FOREIGN KEY (`cidadaoId`) REFERENCES `Cidadao`(`usuarioId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EventoCidadao` ADD CONSTRAINT `EventoCidadao_eventoId_fkey` FOREIGN KEY (`eventoId`) REFERENCES `Evento`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EventoEmpresa` ADD CONSTRAINT `EventoEmpresa_empresaId_fkey` FOREIGN KEY (`empresaId`) REFERENCES `Empresa`(`usuarioId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EventoEmpresa` ADD CONSTRAINT `EventoEmpresa_eventoId_fkey` FOREIGN KEY (`eventoId`) REFERENCES `Evento`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EventoAdministrador` ADD CONSTRAINT `EventoAdministrador_administradorId_fkey` FOREIGN KEY (`administradorId`) REFERENCES `Administrador`(`usuarioId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EventoAdministrador` ADD CONSTRAINT `EventoAdministrador_eventoId_fkey` FOREIGN KEY (`eventoId`) REFERENCES `Evento`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cidadaoCupomResgatado` ADD CONSTRAINT `cidadaoCupomResgatado_cidadaoId_fkey` FOREIGN KEY (`cidadaoId`) REFERENCES `Cidadao`(`usuarioId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cidadaoCupomResgatado` ADD CONSTRAINT `cidadaoCupomResgatado_cupomId_fkey` FOREIGN KEY (`cupomId`) REFERENCES `Cupom`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
