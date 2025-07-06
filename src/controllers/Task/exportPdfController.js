import PDFDocument from 'pdfkit';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function exportPdfController(req, res) {
  const userId = req.query.userId;

  if (!userId) {
    return res.status(400).json({ message: 'UserId é obrigatório.' });
  }

  try {
    const tasks = await prisma.task.findMany({
      where: { userId }
    });

    const doc = new PDFDocument();

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=tasks.pdf');

    doc.pipe(res);

    doc.fontSize(18).text('Minhas Tarefas', { align: 'center' });
    doc.moveDown();

    if (tasks.length === 0) {
      doc.text('Nenhuma tarefa encontrada.');
    } else {
      tasks.forEach((task, index) => {
        doc.fontSize(12).text(
          `${index + 1}. ${task.title} - ${task.description} - Concluída: ${task.complet ? 'Sim' : 'Não'}`
        );
        doc.moveDown(0.5);
      });
    }

    doc.end();

  } catch (error) {
    console.error('Erro ao gerar PDF:', error);
    res.status(500).json({ message: 'Erro ao gerar PDF' });
  }
}
