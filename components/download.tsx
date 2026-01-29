"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowDown } from "lucide-react"

export function DownloadButton() {
  const [isDownloading, setIsDownloading] = useState(false)

  const handleDownload = async () => {
    setIsDownloading(true)
    try {
      const container = document.querySelector(".container") as HTMLElement | null
      if (!container) throw new Error("Resume container not found")

      const html2canvas = (await import("html2canvas")).default
      const { jsPDF } = await import("jspdf")

      // ✅ Clone container to safely manipulate icons
      const clone = container.cloneNode(true) as HTMLElement

      // ✅ Fix Lucide SVG misalignment by enforcing flex centering and size
      const icons = clone.querySelectorAll("svg")
      await Promise.all(
        Array.from(icons).map(async (icon) => {
          const serializer = new XMLSerializer()
          const svgString = serializer.serializeToString(icon)
          const svgBase64 =
            "data:image/svg+xml;base64," +
            btoa(unescape(encodeURIComponent(svgString)))

          const img = document.createElement("img")
          img.src = svgBase64
          img.width = icon.clientWidth || 16
          img.height = icon.clientHeight || 16

          // ✅ Important part: keep alignment same as original SVG
          img.style.display = "inline-block"
          img.style.verticalAlign = "middle"
          img.style.marginTop = "-2px" // fine-tunes downward alignment
          img.style.marginRight = "2px"

          icon.replaceWith(img)
        })
      )

      // ✅ Create temporary wrapper for clean rendering
      const wrapper = document.createElement("div")
      wrapper.style.position = "fixed"
      wrapper.style.top = "-9999px"
      wrapper.appendChild(clone)
      document.body.appendChild(wrapper)

      // ✅ Capture the clone
      const canvas = await html2canvas(clone, {
        scale: 2,
        useCORS: true,
        logging: false,
      })

      document.body.removeChild(wrapper)

      const imgData = canvas.toDataURL("image/png")
      const pdf = new jsPDF({
        unit: "pt",
        format: "a4",
        orientation: "portrait",
      })

      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = pdf.internal.pageSize.getHeight()
      const imgWidth = canvas.width
      const imgHeight = canvas.height
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight)
      const imgScaledWidth = imgWidth * ratio
      const imgScaledHeight = imgHeight * ratio
      const marginX = (pdfWidth - imgScaledWidth) / 2
      const marginY = (pdfHeight - imgScaledHeight) / 2

      pdf.addImage(imgData, "PNG", marginX, marginY, imgScaledWidth, imgScaledHeight)
      pdf.save("Prasanna_Bhattarai_Resume.pdf")
    } catch (err) {
      console.error("Download failed:", err)
      // Never fall back to printing from the download button.
      // Printing should only happen via the dedicated PrintButton.
      alert("Download failed. Please try again.")
    } finally {
      setTimeout(() => setIsDownloading(false), 500)
    }
  }

  return (
    <Button
      onClick={handleDownload}
      className="fixed bottom-20 right-4 print:hidden rounded-full p-3 shadow-lg hover:shadow-xl active:scale-95 transition-transform"
      disabled={isDownloading}
    >
      <ArrowDown className="h-4 w-4" />
    </Button>
  )
}
