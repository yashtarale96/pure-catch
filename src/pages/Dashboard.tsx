import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Calculator, MapPin, Droplet, TrendingUp, FileText, Download, Circle as BarChart3, DollarSign } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import InputForm from '@/components/InputForm';
import ResultsDisplay from '@/components/ResultsDisplay';
import CostAnalysis from '@/components/CostAnalysis';
import LocationPicker from '@/components/LocationPicker';

interface CalculationData {
  roofArea: number;
  location: string;
  roofType: string;
  annualRainfall: number;
  harvestableWater: number;
  storageRecommendation: number;
  totalCost: number;
  roi: number;
  paybackPeriod: number;
}

export default function Dashboard() {
  const [calculationData, setCalculationData] = useState<CalculationData | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [activeTab, setActiveTab] = useState('input');
  const { toast } = useToast();

  const handleCalculation = async (formData: any) => {
    setIsCalculating(true);

    // Simulate calculation delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Mock calculation logic
    const runoffCoefficient = formData.roofType === 'metal' ? 0.95 :
    formData.roofType === 'tile' ? 0.85 : 0.75;

    const harvestableWater = formData.roofArea * formData.annualRainfall * runoffCoefficient * 0.623 / 1000;
    const storageRecommendation = Math.ceil(harvestableWater * 0.1);
    const totalCost = storageRecommendation * 150 + 2500;
    const annualSavings = harvestableWater * 0.004 * 365;
    const paybackPeriod = totalCost / annualSavings;
    const roi = annualSavings / totalCost * 100;

    const results: CalculationData = {
      roofArea: formData.roofArea,
      location: formData.location,
      roofType: formData.roofType,
      annualRainfall: formData.annualRainfall,
      harvestableWater: Math.round(harvestableWater),
      storageRecommendation,
      totalCost: Math.round(totalCost),
      roi: Math.round(roi * 100) / 100,
      paybackPeriod: Math.round(paybackPeriod * 100) / 100
    };

    setCalculationData(results);
    setIsCalculating(false);
    setActiveTab('results');

    toast({
      title: "Calculation Complete",
      description: "Your rainwater harvesting analysis is ready!"
    });
  };

  const handleExportPDF = () => {
    toast({
      title: "PDF Export",
      description: "PDF report generation would be implemented here"
    });
  };

  const handleExportExcel = () => {
    toast({
      title: "Excel Export",
      description: "Excel report generation would be implemented here"
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-heading font-bold text-primary mb-4">
            Rainwater Harvesting Calculator
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Calculate your potential water savings, storage requirements, and return on investment 
            with our professional rainwater harvesting analysis tool.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="input" className="flex items-center gap-2">
              <Calculator className="h-4 w-4" />
              Input Data
            </TabsTrigger>
            <TabsTrigger value="results" disabled={!calculationData}>
              <Droplet className="h-4 w-4" />
              Results
            </TabsTrigger>
            <TabsTrigger value="analysis" disabled={!calculationData}>
              <BarChart3 className="h-4 w-4" />
              Cost Analysis
            </TabsTrigger>
            <TabsTrigger value="location" disabled={!calculationData}>
              <MapPin className="h-4 w-4" />
              Location Data
            </TabsTrigger>
          </TabsList>

          <TabsContent value="input" className="space-y-6">
            <InputForm
              onCalculate={handleCalculation}
              isCalculating={isCalculating} />

          </TabsContent>

          <TabsContent value="results" className="space-y-6">
            {calculationData &&
            <>
                <ResultsDisplay data={calculationData} />
                <div className="flex justify-center gap-4">
                  <Button onClick={handleExportPDF} className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Export PDF
                  </Button>
                  <Button onClick={handleExportExcel} variant="outline" className="flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    Export Excel
                  </Button>
                </div>
              </>
            }
          </TabsContent>

          <TabsContent value="analysis" className="space-y-6">
            {calculationData && <CostAnalysis data={calculationData} />}
          </TabsContent>

          <TabsContent value="location" className="space-y-6">
            {calculationData && <LocationPicker location={calculationData.location} />}
          </TabsContent>
        </Tabs>
      </main>
    </div>);

}