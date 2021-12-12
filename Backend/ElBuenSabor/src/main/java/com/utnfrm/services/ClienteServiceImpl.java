package com.utnfrm.services;

import com.lowagie.text.*;
import com.lowagie.text.Font;
import com.lowagie.text.pdf.PdfPCell;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;
import com.utnfrm.entities.Cliente;
import com.utnfrm.entities.DetalleFactura;
import com.utnfrm.entities.Factura;
import com.utnfrm.repositories.BaseRepository;
import com.utnfrm.repositories.ClienteRepository;
import com.utnfrm.repositories.FacturaRepository;
import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.activation.DataSource;
import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import javax.servlet.http.HttpServletResponse;
import java.awt.*;
import java.io.IOException;
import java.sql.Blob;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

@Service
public class ClienteServiceImpl extends BaseServiceImpl<Cliente, Long> implements ClienteService {

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private FacturaRepository facturaRepository;

    @Autowired
    private JavaMailSender javaMailSender;

    public ClienteServiceImpl(BaseRepository<Cliente, Long> baseRepository) {
        super(baseRepository);
    }

    @Transactional
    public Cliente sendEmail(Long idCliente, String fileName) throws MailException {
        SimpleMailMessage mail = new SimpleMailMessage();
        Cliente cliente = clienteRepository.findById(idCliente).get();
        mail.setFrom("elbuensabor@noreplay.com");
        mail.setTo(cliente.getEmail());
        mail.setSubject("El Buen Sabor - Factura de compra - " + cliente.getNombre() + ", " + cliente.getApellido());
        mail.setText("A través del siguiente link podrá descarcar su factura: " + fileName);

        javaMailSender.send(mail);
        return cliente;
    }

    @Transactional
    public void sendEmailWithAttachment(MultipartFile file, Long idCliente) throws MailException, MessagingException {
        try {
            System.out.println("LLEGUE");
            System.out.println("ARCHIVO: " + file);

            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);
            Cliente cliente = clienteRepository.findById(idCliente).get();
            helper.setTo(cliente.getEmail());
            helper.setSubject("El Buen Sabor - Factura de compra");
            helper.setText("Se adjunta la factura de la compra realizada:");
            helper.addAttachment("Factura.pdf", file);
            javaMailSender.send(mimeMessage);
        } catch (MailException mailException) {
            throw mailException;
        }
    }

    public void exportToPDF(Long idCliente, Long idFactura,
                            HttpServletResponse response) throws DocumentException, IOException {
        try {
            response.setContentType("application/pdf");
            DateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd_HH:mm:ss");
            String currentDateTime = dateFormatter.format(new Date());

            Cliente cliente = this.clienteRepository.findById(idCliente).get();
            Factura factura = this.facturaRepository.findById(idFactura).get();

            String headerKey = "Content-Disposition";
            String headerValue = "attachment; filename=factura_" + cliente.getNombre() + "-"
                    + cliente.getApellido() + "_" + currentDateTime + ".pdf";
            response.setHeader(headerKey, headerValue);

            Document document = new Document(PageSize.A4);
            PdfWriter.getInstance(document, response.getOutputStream());
            document.open();

            Font font = FontFactory.getFont(FontFactory.HELVETICA_BOLD);
            font.setSize(18);
            font.setColor(Color.BLACK);
            Paragraph paragraph = new Paragraph("Factura", font);
            paragraph.setAlignment(Paragraph.ALIGN_CENTER);

            document.add(paragraph);

            PdfPTable table = new PdfPTable(3);
            table.setWidthPercentage(100f);
            table.setSpacingBefore(10);

            this.writeTableHeader(table);
            this.writeTableData(table, factura);

            document.add(table);
            document.close();
        } catch (DocumentException | IOException dex) {
            throw dex;
        }
    }

    public void writeTableHeader(PdfPTable table) {
        PdfPCell cell = new PdfPCell();
        cell.setBackgroundColor(Color.DARK_GRAY);
        cell.setPadding(5);

        Font font = FontFactory.getFont(FontFactory.HELVETICA_BOLD);
        font.setColor(Color.WHITE);

        cell.setPhrase(new Phrase("Nro. Factura", font));
        table.addCell(cell);
        cell.setPhrase(new Phrase("Fecha Factura", font));
        table.addCell(cell);
        cell.setPhrase(new Phrase("Total", font));
        table.addCell(cell);
    }

    public void writeTableData(PdfPTable table, Factura factura) {
        float total = 0;
        System.out.println(factura.getNumero());
        System.out.println(factura.getFecha());

        table.addCell(String.valueOf(factura.getNumero()));
        table.addCell(String.valueOf(factura.getFecha()));

        for (DetalleFactura detalle : factura.getDetallesFactura()) {
            total += detalle.getSubtotal();
        }
        table.addCell(String.valueOf(total - factura.getMontoDescuento()));
    }

    @Override
    @Transactional
    public Cliente buscarPorEmail(String email) throws Exception {
        try {
            return this.clienteRepository.buscarPorEmail(email);
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    @Override
    @Transactional
    public Cliente save(Cliente cliente) throws Exception {
        String encriptMD5 = DigestUtils.md5Hex(cliente.getUsuario().getClave());
        cliente.getUsuario().setClave(encriptMD5);
        return super.save(cliente);
    }

    @Override
    @Transactional
    public Cliente update(Long id, Cliente cliente) throws Exception {
        if (cliente.getUsuario().getClave().length() < 32) {
            String encriptMD5 = DigestUtils.md5Hex(cliente.getUsuario().getClave());
            cliente.getUsuario().setClave(encriptMD5);
        }
        return super.update(id, cliente);
    }
}
