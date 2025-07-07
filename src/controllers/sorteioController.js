import prisma from '../utils/prisma.js';

// Pega todos os sorteios
export async function getAllSorteios(req, res) {
  try {
    const sorteios = await prisma.sorteio.findMany();
    res.json(sorteios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar sorteios' });
  }
}

// Pega um sorteio pelo ID
export async function getSorteioById(req, res) {
  const id = parseInt(req.params.id);
  try {
    const sorteio = await prisma.sorteio.findUnique({ where: { id } });
    if (!sorteio) {
      return res.status(404).json({ message: 'Sorteio não encontrado' });
    }
    res.json(sorteio);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar sorteio' });
  }
}

// Cria um novo sorteio
export async function createSorteio(req, res) {
  const { nome, descricao, dataSorteio, lojaId } = req.body;
  try {
    const novoSorteio = await prisma.sorteio.create({
      data: {
        nome,
        descricao,
        data_sorteio: new Date(dataSorteio),
        loja_id: lojaId,
      },
    });
    res.status(201).json(novoSorteio);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao criar sorteio' });
  }
}

// Atualiza um sorteio inteiro (PUT)
export async function updateSorteio(req, res) {
  const id = parseInt(req.params.id);
  const { nome, descricao, dataSorteio, lojaId } = req.body;
  try {
    const sorteioAtualizado = await prisma.sorteio.update({
      where: { id },
      data: {
        nome,
        descricao,
        data_sorteio: new Date(dataSorteio),
        loja_id: lojaId,
      },
    });
    res.json(sorteioAtualizado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao atualizar sorteio' });
  }
}

// Atualização parcial (PATCH)
export async function partialUpdateSorteio(req, res) {
  const id = parseInt(req.params.id);
  const data = req.body; // pode ter só alguns campos
  if (data.dataSorteio) {
    data.data_sorteio = new Date(data.dataSorteio);
    delete data.dataSorteio;
  }
  try {
    const sorteioAtualizado = await prisma.sorteio.update({
      where: { id },
      data,
    });
    res.json(sorteioAtualizado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao atualizar sorteio' });
  }
}

// Deleta um sorteio
export async function deleteSorteio(req, res) {
  const id = parseInt(req.params.id);
  try {
    await prisma.sorteio.delete({ where: { id } });
    res.json({ message: 'Sorteio deletado com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao deletar sorteio' });
  }
}

export default {
  getAllSorteios,
  getSorteioById,
  createSorteio,
  updateSorteio,
  partialUpdateSorteio,
  deleteSorteio,
};
