import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LucideIcon, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  servicePath: string;
  isConfigured: boolean;
  iconColor?: string;
}

export const ServiceCard = ({
  title,
  description,
  icon: Icon,
  servicePath,
  isConfigured,
  iconColor = "text-primary",
}: ServiceCardProps) => {
  return (
    <Link to={servicePath} className="block group">
      <Card className="relative overflow-hidden cursor-pointer transition-all duration-500 ease-out hover:scale-[1.02] hover:shadow-xl hover:border-primary/50 h-full">
        {/* Badge de Status */}
        <div className="absolute top-6 right-6 z-10">
          <Badge 
            variant={isConfigured ? "default" : "outline"} 
            className={`
              animate-scale-in
              ${isConfigured 
                ? "bg-success text-success-foreground shadow-sm" 
                : "border-warning/50 text-warning bg-warning/5 animate-glow-pulse"
              }
            `}
          >
            {isConfigured ? "✓ Configurado" : "⚠ Pendente"}
          </Badge>
        </div>
        
        {/* Ícone com Animação */}
        <CardHeader className="pt-10 pb-6">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-accent/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-sm">
            <Icon className={`h-10 w-10 ${iconColor} transition-transform duration-500`} />
          </div>
          
          <CardTitle className="text-2xl font-bold tracking-tight mb-2 group-hover:text-primary transition-colors duration-300">
            {title}
          </CardTitle>
          
          <CardDescription className="text-base leading-relaxed text-muted-foreground">
            {description}
          </CardDescription>
        </CardHeader>
        
        {/* Call to Action Visual */}
        <CardContent className="pb-8">
          <div className="flex items-center text-primary font-medium group-hover:translate-x-2 transition-transform duration-300">
            <span>Acessar serviço</span>
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
          </div>
        </CardContent>

        {/* Hover Gradient Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-accent/0 group-hover:from-primary/5 group-hover:via-transparent group-hover:to-accent/5 transition-all duration-500 pointer-events-none" />
      </Card>
    </Link>
  );
};
