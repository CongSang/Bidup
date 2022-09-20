package com.charitysm.pojo;

import com.charitysm.pojo.base.ReportBase;
import java.io.Serializable;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author CÔNG SANG
 */
@Entity
@Table(name = "report_auction")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "ReportAuction.findAll", query = "SELECT r FROM ReportAuction r"),
    @NamedQuery(name = "ReportAuction.findById", query = "SELECT r FROM ReportAuction r WHERE r.id = :id"),
    @NamedQuery(name = "ReportAuction.findByReason", query = "SELECT r FROM ReportAuction r WHERE r.reason = :reason"),
    @NamedQuery(name = "ReportAuction.findByIsSolve", query = "SELECT r FROM ReportAuction r WHERE r.isSolve = :isSolve")})
public class ReportAuction extends ReportBase implements Serializable {

    private static final long serialVersionUID = 1L;
   
    @JoinColumn(name = "auction_id", referencedColumnName = "id")
    @ManyToOne(optional = false)
    private Auction auctionId;
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    @ManyToOne(optional = false)
    private User userId;

    public ReportAuction() {
    }

    public ReportAuction(Integer id) {
        this.id = id;
    }

    public ReportAuction(Integer id, String reason) {
        this.id = id;
        this.reason = reason;
    }
    
    public Auction getAuctionId() {
        return auctionId;
    }

    public void setAuctionId(Auction auctionId) {
        this.auctionId = auctionId;
    }

    public User getUserId() {
        return userId;
    }

    public void setUserId(User userId) {
        this.userId = userId;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (id != null ? id.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof ReportAuction)) {
            return false;
        }
        ReportAuction other = (ReportAuction) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.charitysm.pojo.ReportAuction[ id=" + id + " ]";
    }

}
