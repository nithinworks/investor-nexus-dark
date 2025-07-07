import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { X } from "lucide-react";

interface FilterSectionProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCountry: string;
  setSelectedCountry: (country: string) => void;
  selectedType: string;
  setSelectedType: (type: string) => void;
  selectedStage: string;
  setSelectedStage: (stage: string) => void;
  selectedTags: string[];
  setSelectedTags: (tags: string[]) => void;
  availableTags: string[];
  countries: string[];
}

const FilterSection = ({
  searchTerm,
  setSearchTerm,
  selectedCountry,
  setSelectedCountry,
  selectedType,
  setSelectedType,
  selectedStage,
  setSelectedStage,
  selectedTags,
  setSelectedTags,
  availableTags,
  countries,
}: FilterSectionProps) => {
  const investmentTypes = ["VC", "Angel", "Family Office", "Corporate"];
  const investmentStages = [
    "Pre-Seed",
    "Seed",
    "Series A",
    "Series B",
    "Series C+",
    "Growth",
  ];

  const addTag = (tag: string) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const removeTag = (tagToRemove: string) => {
    setSelectedTags(selectedTags.filter((tag) => tag !== tagToRemove));
  };

  const clearAllFilters = () => {
    setSearchTerm("");
    setSelectedCountry("");
    setSelectedType("");
    setSelectedStage("");
    setSelectedTags([]);
  };

  return (
    <div className="bg-black/30 rounded-2xl p-6 border border-gray-800/80 space-y-6 sticky top-28">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-white">Filters</h3>
        <Button
          onClick={clearAllFilters}
          variant="ghost"
          size="sm"
          className="text-gray-400 hover:text-white"
        >
          Clear All
        </Button>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="search" className="text-gray-400">
            Search
          </Label>
          <Input
            id="search"
            type="text"
            placeholder="Search by name, company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-black/20 border-gray-700/80 text-white mt-1 h-12 focus:ring-pink-500 focus:border-pink-500"
          />
        </div>

        <div>
          <Label className="text-gray-400">Country</Label>
          <Select value={selectedCountry} onValueChange={setSelectedCountry}>
            <SelectTrigger className="bg-black/20 border-gray-700/80 text-white mt-1 h-12 focus:ring-pink-500 focus:border-pink-500">
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent className="bg-[#0A0A0A] border-gray-700/80 text-white">
              <SelectItem value=" ">All Countries</SelectItem>
              {countries.map((country) => (
                <SelectItem
                  key={country}
                  value={country}
                  className="focus:bg-gray-700/80"
                >
                  {country}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Accordion
        type="multiple"
        className="w-full"
        defaultValue={["type", "stage"]}
      >
        <AccordionItem value="type" className="border-b-0">
          <AccordionTrigger className="py-2 text-base text-gray-300 hover:text-white hover:no-underline">
            Investment Type
          </AccordionTrigger>
          <AccordionContent>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="bg-black/20 border-gray-700/80 text-white mt-1 h-12 focus:ring-pink-500 focus:border-pink-500">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent className="bg-[#0A0A0A] border-gray-700/80 text-white">
                <SelectItem value=" ">All Types</SelectItem>
                {investmentTypes.map((type) => (
                  <SelectItem
                    key={type}
                    value={type}
                    className="focus:bg-gray-700/80"
                  >
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="stage" className="border-b-0">
          <AccordionTrigger className="py-2 text-base text-gray-300 hover:text-white hover:no-underline">
            Investment Stage
          </AccordionTrigger>
          <AccordionContent>
            <Select value={selectedStage} onValueChange={setSelectedStage}>
              <SelectTrigger className="bg-black/20 border-gray-700/80 text-white mt-1 h-12 focus:ring-pink-500 focus:border-pink-500">
                <SelectValue placeholder="Select stage" />
              </SelectTrigger>
              <SelectContent className="bg-[#0A0A0A] border-gray-700/80 text-white">
                <SelectItem value=" ">All Stages</SelectItem>
                {investmentStages.map((stage) => (
                  <SelectItem
                    key={stage}
                    value={stage}
                    className="focus:bg-gray-700/80"
                  >
                    {stage}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="tags" className="border-b-0">
          <AccordionTrigger className="py-2 text-base text-gray-300 hover:text-white hover:no-underline">
            Tags
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <Select onValueChange={addTag}>
                <SelectTrigger className="bg-black/20 border-gray-700/80 text-white h-12 focus:ring-pink-500 focus:border-pink-500">
                  <SelectValue placeholder="Add tags" />
                </SelectTrigger>
                <SelectContent className="bg-[#0A0A0A] border-gray-700/80 text-white">
                  {availableTags
                    .filter((tag) => !selectedTags.includes(tag))
                    .map((tag) => (
                      <SelectItem
                        key={tag}
                        value={tag}
                        className="focus:bg-gray-700/80"
                      >
                        {tag}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>

              {selectedTags.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {selectedTags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="bg-pink-500/10 text-pink-400 border border-pink-500/20 flex items-center gap-1"
                    >
                      {tag}
                      <X
                        className="h-3 w-3 cursor-pointer hover:text-white"
                        onClick={() => removeTag(tag)}
                      />
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default FilterSection;
