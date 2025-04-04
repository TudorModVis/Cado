"use client"
 
import { sendMessageRequest } from "@/lib/validation/contacts/sendMessageRequest"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Textarea } from "@/components/ui/textarea"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { ChevronDown } from "lucide-react"
import { Checkbox } from "../ui/checkbox"
import { Link } from "@/i18n/navigation"

export default function ContactForm() {
    const form = useForm<z.infer<typeof sendMessageRequest>>({
        resolver: zodResolver(sendMessageRequest),
        defaultValues: {
            name: "",
            email: "",
            message: "",
            contact_method: ["EMAIL"],
            tel_number: "",
        },
      })

    function onSubmit(values: z.infer<typeof sendMessageRequest>) {
        console.log(values)
    }

    return (
        <>
            <h3 className='col-span-full text-center mb-16 font-manrope text-3xl leading-11 uppercase font-semibold'>CONTACTEAZĂ-NE</h3>
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="col-start-4 col-span-9 grid grid-cols-9">
                <div className="col-span-4">
                    <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                            <FormItem className="">
                                <FormMessage className="left-0 -top-6" />
                                    <Select onValueChange={field.onChange} >
                                        <FormControl>
                                            <SelectTrigger className="cursor-pointer flex h-12 max-h-none items-center px-6 gap-2 border border-gray rounded-3xl text-base text-black font-manrope font-semibold w-full">
                                                <SelectValue placeholder="Alege subiectul" />
                                                <ChevronDown className='size-5' strokeWidth={1.5}/>
                                            </SelectTrigger>
                                        </FormControl>  
                                        <SelectContent className="border-gray">
                                            <SelectGroup>
                                                <SelectItem className="text-base cursor-pointer font-semibold font-manrope" value={"ORDER_ISSUE"}>Recomandate</SelectItem>
                                                <SelectItem className="text-base cursor-pointer font-semibold font-manrope" value={"GIFT_ASSITANCE"}>Produse noi</SelectItem>
                                                <SelectItem className="text-base cursor-pointer font-semibold font-manrope" value={"COMPANY_COLLABORATION"}>Preț: Mic la Mare</SelectItem>
                                                <SelectItem className="text-base cursor-pointer font-semibold font-manrope" value={"OTHER"}>Preț: Mare la Mic</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                            </FormItem>
                        )}
                    />
                </div>
                <div className="col-span-1"></div>
                <div className="col-span-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem className="text-base text-black font-manrope font-semibold w-full">
                                <FormMessage className="left-0 -top-6" />
                                <FormControl className="border rounded-3xl border-gray shadow-none p-0 text-black placeholder:text-black focus-visible:outline-none">
                                    <Input className="h-12 w-full px-6 rounded-3xl" placeholder="Nume*" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>

                <div className="col-span-4 mt-4">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className="text-base text-black font-manrope font-semibold w-full">
                                <FormMessage className="left-0 -top-6" />
                                <FormControl className="border rounded-3xl border-gray shadow-none p-0 text-black placeholder:text-black focus-visible:outline-none">
                                    <Input className="h-12 w-full px-6 rounded-3xl" placeholder="Email*" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>
                <div className="col-span-1"></div>
                <div className="col-span-4 mt-4">
                    <FormField
                        control={form.control}
                        name="tel_number"
                        render={({ field }) => (
                            <FormItem className="text-base text-black font-manrope font-semibold w-full">
                                <FormMessage className="left-0 -top-6" />
                                <FormControl className="border rounded-3xl border-gray shadow-none p-0 text-black placeholder:text-black focus-visible:outline-none">
                                    <Input className="h-12 w-full px-6 rounded-3xl" placeholder="Telefon*" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>

                <div className="col-span-full mt-4">
                    <p className="font-semibold font-manrope mb-4">Modul preferat de contact?</p>
                    <div className="flex gap-8">
                        <FormField
                            control={form.control}
                            name="contact_method"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="flex gap-8">
                                        <FormControl className="border-none shadow-none p-0 text-black placeholder:text-black focus-visible:outline-none">
                                            <div className="flex gap-2">
                                                <Checkbox 
                                                    checked={field.value?.includes("EMAIL")}  
                                                    onCheckedChange={(checked) => {
                                                        return checked
                                                        ? field.onChange([...field.value, "EMAIL"])
                                                        : field.onChange(
                                                            field.value?.filter(
                                                                (value) => value !== "EMAIL"
                                                            )
                                                            )
                                                    }}
                                                    id="email" 
                                                    className="border-gray size-4 cursor-pointer"/>
                                                <label htmlFor="email" className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer">Email</label>
                                            </div>
                                        </FormControl>
                                        <FormControl>
                                        <div className="flex gap-2">
                                                <Checkbox 
                                                    checked={field.value?.includes("TEL")}  
                                                    onCheckedChange={(checked) => {
                                                        return checked
                                                        ? field.onChange([...field.value, "TEL"])
                                                        : field.onChange(
                                                            field.value?.filter(
                                                                (value) => value !== "TEL"
                                                            )
                                                            )
                                                    }}
                                                    id="TEL" 
                                                    className="border-gray size-4 cursor-pointer"/>
                                                <label htmlFor="TEL" className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer">Telefon</label>
                                            </div>
                                        </FormControl>
                                    </div>
                                    <FormMessage className="left-0 -top-6" />
                                </FormItem>
                            )}
                            
                        />
                    </div>
                </div>

                <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                        <FormItem className="col-span-full">
                            <FormControl>
                                <Textarea className="placeholder:text-black h-40 mt-4 items-center px-6 border border-gray rounded-3xl text-base text-black font-manrope font-semibold col-span-full" placeholder="Mesaj*" {...field}/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex gap-2 col-span-full mt-4">
                    <Checkbox id="telefon" className="border-gray size-4 cursor-pointer"/>
                    <span>Sunt de acord cu <Link href="/terms" className="underline">Termenii și condițiile și cu Politica de confidențialitate</Link></span>
                </div>
                <Button type="submit" className="font-manrope hover:bg-blue-2 text-white font-semibold text-base cursor-pointer col-span-full h-12 rounded-3xl bg-blue-2 mt-8 mb-24">Transmite mesajul</Button>
            </form>
            </Form>
        </>
      )
}